import { NextResponse } from 'next/server';
import { mockPosts, generateId } from '@/lib/data/mockPosts';
import { Post } from '@/types';
import { getServerSession } from 'next-auth';

// In-memory storage for posts
let posts = [...mockPosts];

// GET handler to fetch all posts
export async function GET() {
  return NextResponse.json(posts);
}

// POST handler to generate a new blog post
export async function POST(request: Request) {
  try {
    // Check if user is authenticated (middleware already handles this, but we'll double-check)
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { topic } = await request.json();
    
    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    // Generate a random title based on the topic
    const title = `${topic} ${getRandomTitle()}`;
    
    // Create a new post
    const newPost: Post = {
      id: generateId(),
      title,
      content: generateContent(topic, title),
      excerpt: `Explore the fascinating world of ${topic} and discover insights that can transform your understanding.`,
      author: session.user?.name || 'Anonymous User',
      createdAt: new Date().toISOString(),
      readTime: Math.floor(Math.random() * 10) + 3, // 3-12 minute read time
      tags: [topic, ...getRandomTags()],
      imageUrl: getRandomImage(),
    };

    // Add to the posts array
    posts = [newPost, ...posts];

    return NextResponse.json(newPost);
  } catch (error) {
    console.error('Error generating post:', error);
    return NextResponse.json(
      { error: 'Failed to generate post' },
      { status: 500 }
    );
  }
}

// DELETE handler to delete a post
export async function DELETE(request: Request) {
  try {
    // Check if user is authenticated (middleware already handles this, but we'll double-check)
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const initialLength = posts.length;
    posts = posts.filter(post => post.id !== id);

    if (posts.length === initialLength) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}

// Helper functions
function getRandomTitle(): string {
  const titles = [
    'Guide: Everything You Need to Know',
    'Essentials for Beginners',
    'Advanced Techniques and Strategies',
    'The Future Trends to Watch',
    'Common Myths Debunked',
    'How To Master the Fundamentals',
    'Surprising Facts You Didn\'t Know',
    'The Ultimate Resource',
    'Best Practices for 2023',
    'A Comprehensive Overview'
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function getRandomAuthor(): string {
  const authors = [
    'Jane Smith',
    'John Doe',
    'Alex Johnson',
    'Sarah Williams',
    'Michael Brown',
    'Emily Davis',
    'Robert Wilson',
    'Lisa Moore',
    'David Taylor',
    'Jennifer Garcia'
  ];
  return authors[Math.floor(Math.random() * authors.length)];
}

function getRandomTags(): string[] {
  const allTags = [
    'Technology', 'Development', 'Programming', 
    'Design', 'UX', 'Frontend', 'Backend', 
    'AI', 'Machine Learning', 'Data Science',
    'Web Development', 'Mobile', 'Cloud Computing',
    'DevOps', 'Agile', 'Business', 'Career'
  ];
  
  // Get 2-4 random tags
  const numTags = Math.floor(Math.random() * 3) + 2;
  const tags: string[] = [];
  
  for (let i = 0; i < numTags; i++) {
    const randomTag = allTags[Math.floor(Math.random() * allTags.length)];
    if (!tags.includes(randomTag)) {
      tags.push(randomTag);
    }
  }
  
  return tags;
}

function getRandomImage(): string {
  const images = [
    'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80'
  ];
  return images[Math.floor(Math.random() * images.length)];
}

function generateContent(topic: string, title: string): string {
  return `
    # ${title}

    This is an AI-generated blog post about ${topic}. Let's explore this fascinating subject together.

    ## Introduction

    ${topic} is a rapidly evolving field with immense potential. Whether you're a beginner or an expert, there's always something new to learn.

    ## Key Concepts

    When diving into ${topic}, it's important to understand these fundamental concepts:

    - The core principles that drive ${topic}
    - How ${topic} is applied in different contexts
    - The evolution of ${topic} over time
    - Current trends and future directions

    ## Practical Applications

    ${topic} can be applied in various ways:

    1. Improving efficiency in daily operations
    2. Solving complex problems that were previously insurmountable
    3. Creating new opportunities for innovation and growth
    4. Enhancing user experiences across different platforms

    ## Case Studies

    Let's look at some examples of ${topic} in action:

    ### Example 1: Industry Transformation

    Many industries have been revolutionized by implementing ${topic} in their core processes.

    ### Example 2: Startup Success

    Startups that leverage ${topic} effectively often see accelerated growth and competitive advantages.

    ## Best Practices

    To make the most of ${topic}, consider these best practices:

    - Start with a clear understanding of your goals
    - Continuously learn and adapt as the field evolves
    - Collaborate with experts and communities
    - Measure and analyze your results

    ## Conclusion

    ${topic} offers tremendous opportunities for those willing to explore and master it. By understanding its core principles and applying best practices, you can leverage ${topic} to achieve remarkable results.
  `;
} 