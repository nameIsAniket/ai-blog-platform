'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/types';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { FiClock, FiArrowLeft, FiTrash2, FiAlertCircle } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

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
              <span className="sr-only">Dismiss</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function PostDetail() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ show: boolean; message: string; type: 'info' | 'error' }>({
    show: false,
    message: '',
    type: 'info'
  });

  // Check if user is demo user
  const isDemoUser = session?.user && 'id' in session.user && session.user.id === 'demo-user-id';

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/posts/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load the blog post. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  const handleDelete = async () => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    // Check if demo user and show notification
    if (isDemoUser) {
      setNotification({
        show: true,
        message: 'Demo users cannot delete posts. This is a demo restriction.',
        type: 'info'
      });
      
      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 5000);
      
      return;
    }

    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/posts?id=${post?.id}`, {
        method: 'DELETE',
      });

      if (response.status === 401) {
        router.push('/auth/signin');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      router.push('/');
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete the blog post. Please try again.');
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-3xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 mb-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Post not found'}
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn't find the blog post you're looking for.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Go back home
          </Link>
        </div>
      </div>
    );
  }

  // Convert markdown content to HTML (basic version)
  const renderMarkdown = (content: string) => {
    // This is a very simplified markdown renderer
    // For a real application, you would use a proper markdown library
    let html = content
      // Headers
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-5 mb-2">$1</h3>')
      // Bold
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      // Unordered Lists
      .replace(/^\s*-\s*(.*)/gim, '<li class="ml-6 list-disc">$1</li>')
      // Ordered Lists
      .replace(/^\s*\d+\.\s*(.*)/gim, '<li class="ml-6 list-decimal">$1</li>')
      // Code blocks
      .replace(/```([\s\S]*?)```/gm, '<pre class="bg-gray-100 p-4 rounded-md my-4 overflow-x-auto"><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
      // Paragraphs
      .replace(/\n\s*\n/g, '</p><p class="my-4">');

    // Wrap with paragraph tags if not already
    if (!html.startsWith('<h') && !html.startsWith('<p')) {
      html = '<p class="my-4">' + html;
    }
    if (!html.endsWith('</p>')) {
      html += '</p>';
    }

    return html;
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Header with back button */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex justify-between items-center">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Back to posts
          </Link>
          
          {session && (
            <button
              onClick={handleDelete}
              disabled={isDeleting || isDemoUser}
              className={`inline-flex items-center px-4 py-2 text-red-600 border border-red-600 rounded-md font-medium transition-colors ${
                isDemoUser ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
              title={isDemoUser ? "Demo users cannot delete posts" : "Delete this post"}
            >
              {isDeleting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <FiTrash2 className="mr-2" /> Delete Post
                </>
              )}
            </button>
          )}
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8">
        {/* Post Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center text-gray-600 text-sm mb-6">
            <span className="mr-4">By {post.author}</span>
            <span className="mr-4">{format(new Date(post.createdAt), 'MMMM d, yyyy')}</span>
            <span className="flex items-center">
              <FiClock className="mr-1" /> {post.readTime} min read
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <span 
                key={index} 
                className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="mb-8 rounded-xl overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Post Content */}
        <article 
          className="prose prose-lg max-w-none bg-red"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />
      </main>
    </div>
  );
} 