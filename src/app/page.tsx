'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiSearch, FiFilter, FiX, FiChevronRight, FiLogIn, FiAlertCircle } from 'react-icons/fi';
import { useSession } from 'next-auth/react';

// Blog Post Card Component
const BlogPostCard = ({ post }: { post: Post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="md:flex h-full">
        <div className="md:w-1/3 h-48 md:h-auto relative">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 md:w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">{post.title}</h2>
            </Link>
            <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-4">{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
              <span className="flex items-center">
                <FiClock className="mr-1" /> {post.readTime} min read
              </span>
            </div>
            <div className="text-sm font-medium text-gray-800">
              {post.author}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Notification component
const Notification = ({ message, type, onClose }: { message: string; type: 'info' | 'error'; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-md shadow-lg max-w-md ${
        type === 'info' ? 'bg-blue-50 text-blue-800 border border-blue-200' : 'bg-red-50 text-red-800 border border-red-200'
      }`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <FiAlertCircle className="h-5 w-5" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={onClose}
              className={`inline-flex rounded-md p-1.5 ${
                type === 'info' ? 'text-blue-600 hover:bg-blue-100' : 'text-red-600 hover:bg-red-100'
              }`}
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Page Component
export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ show: boolean; message: string; type: 'info' | 'error' }>({
    show: false,
    message: '',
    type: 'info'
  });

  // Fetch all posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle form submission to generate new blog post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    // Show service unavailable notification
    setNotification({
      show: true,
      message: 'Blog generation service is currently unavailable. Please try again later.',
      type: 'info'
    });

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);

    return; // Stop here - don't try to generate a post

    // The code below won't execute due to the return statement above
    setIsGenerating(true);
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (response.status === 401) {
        // User is not authenticated
        router.push('/auth/signin');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to generate post');
      }

      const newPost = await response.json();
      
      // Add the new post to the top of the list
      setPosts(prevPosts => [newPost, ...prevPosts]);
      
      // Reset the form
      setTopic('');
      
      // Show success message or redirect to the post
      router.push(`/posts/${newPost.id}`);
    } catch (error) {
      console.error('Error generating post:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Filter posts based on search term and tag filter
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = !activeFilter || post.tags.includes(activeFilter);
    
    return matchesSearch && matchesFilter;
  });

  // Get unique tags for filtering
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags))).sort();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <Notification 
            message={notification.message} 
            type={notification.type} 
            onClose={() => setNotification(prev => ({ ...prev, show: false }))}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4 md:px-0 min-h-[75vh] flex items-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI-Powered Blog Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Generate insightful blog posts on any topic with just a few clicks
          </p>

          {/* Blog Generation Form */}
          {status === 'loading' ? (
            <div className="bg-white p-6 rounded-lg shadow-lg animate-pulse h-32"></div>
          ) : !session ? (
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-gray-800 text-xl font-medium mb-4">Sign in to create blog posts</h3>
              <Link
                href="/auth/signin"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                <FiLogIn className="mr-2" /> Sign in to get started
              </Link>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
                <div className="flex-1 mb-4 md:mb-0">
                  <label htmlFor="topic" className="block text-gray-700 text-sm font-bold mb-2">
                    Enter a topic to generate a blog post
                  </label>
                  <input
                    type="text"
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Artificial Intelligence, Web Development, Space Exploration"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900"
                    disabled={isGenerating}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isGenerating || !topic.trim()}
                  className={`
                    px-6 py-3 bg-blue-600 text-white rounded-md font-semibold
                    hover:bg-blue-700 transition-colors duration-300
                    disabled:bg-blue-400 disabled:cursor-not-allowed
                    flex items-center justify-center md:min-w-[150px]
                    w-full md:w-auto
                  `}
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    'Generate Post'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="container mx-auto max-w-6xl py-12 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Latest Blog Posts</h2>
          
          {/* Search and Filter */}
          <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FiX className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            
            <div className="relative inline-block w-full md:w-auto">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter(null)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    activeFilter === null 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition-colors`}
                >
                  All
                </button>
                {allTags.slice(0, 5).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      activeFilter === tag 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } transition-colors`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Blog Post List */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="flex space-x-4">
                  <div className="h-48 md:h-32 bg-gray-300 rounded-md w-1/3"></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            <AnimatePresence>
              {filteredPosts.map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">
              {searchTerm || activeFilter
                ? 'Try adjusting your search or filter criteria'
                : 'Generate your first blog post to get started!'}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
