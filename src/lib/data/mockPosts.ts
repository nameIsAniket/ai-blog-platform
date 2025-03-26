import { Post } from '@/types';

// Mock data for initial blog posts
export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Introduction to Next.js and React',
    content: `
      # Introduction to Next.js and React

      Next.js is a React framework that enables functionality such as server-side rendering and static site generation.

      ## Why Next.js?

      Next.js provides a great developer experience with features like:
      
      - Server-side rendering
      - Static site generation
      - API routes
      - Built-in CSS and Sass support
      - Fast refresh
      - TypeScript support
      
      ## Getting Started
      
      To create a Next.js app, run:
      
      \`\`\`bash
      npx create-next-app@latest my-app
      \`\`\`
      
      This will set up everything automatically for you. If you want to start from scratch, install required packages:
      
      \`\`\`bash
      npm install next react react-dom
      \`\`\`
      
      Then, add the following scripts to your package.json:
      
      \`\`\`json
      "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start"
      }
      \`\`\`
      
      ## Conclusion
      
      Next.js simplifies the development of React applications by providing structure and optimization out of the box.
    `,
    excerpt: 'Learn the basics of Next.js and why its the perfect framework for modern React applications.',
    author: 'Jane Smith',
    createdAt: '2023-09-15T10:30:00Z',
    readTime: 5,
    tags: ['React', 'Next.js', 'Web Development'],
    imageUrl: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '2',
    title: 'Mastering CSS Grid Layout',
    content: `
      # Mastering CSS Grid Layout

      CSS Grid Layout is a two-dimensional layout system designed for user interface design. It allows you to layout items in rows and columns.

      ## Basic Concepts

      The Grid Layout consists of:
      
      - Grid Container: The element on which display: grid is applied
      - Grid Items: The children of the grid container
      - Grid Lines: The dividing lines that make up the structure of the grid
      - Grid Tracks: The space between two adjacent grid lines
      - Grid Cell: The space between four grid lines
      - Grid Area: A rectangular area on the grid contained by four grid lines
      
      ## Creating a Grid

      To create a grid container, you set the display property to grid:
      
      \`\`\`css
      .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
      }
      \`\`\`
      
      This creates a grid with three equal-width columns and a 10px gap between grid items.
      
      ## Responsive Grids

      You can create responsive grids using:
      
      - minmax()
      - auto-fill and auto-fit
      - media queries
      
      ## Conclusion
      
      CSS Grid is a powerful tool for creating complex layouts. Combined with Flexbox for one-dimensional layouts, it gives you all the tools you need for modern web design.
    `,
    excerpt: 'A comprehensive guide to CSS Grid Layout for creating responsive and complex web layouts.',
    author: 'John Doe',
    createdAt: '2023-09-10T14:20:00Z',
    readTime: 8,
    tags: ['CSS', 'Web Design', 'Frontend'],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '3',
    title: 'The Future of AI in Web Development',
    content: `
      # The Future of AI in Web Development

      Artificial intelligence is transforming web development in numerous ways, from code generation to design automation.

      ## Current Applications
      
      - AI-powered code completion tools
      - Automated testing and bug detection
      - Design systems with AI components
      - Chatbots and virtual assistants
      - Content generation
      
      ## Future Trends
      
      ### No-Code Development
      
      AI will empower more people to create websites and applications without writing code, using natural language to describe what they want to build.
      
      ### Personalized User Experiences
      
      AI will enable truly personalized experiences by analyzing user behavior and preferences in real-time.
      
      ### Automated Optimization
      
      From performance to SEO, AI will automatically optimize websites for the best possible outcomes.
      
      ## Ethical Considerations
      
      - Privacy concerns
      - Bias in AI systems
      - Job displacement
      - Accessibility
      
      ## Conclusion
      
      AI will not replace web developers but will change how they work. The most successful developers will be those who learn to leverage AI tools effectively while focusing on the creative and human aspects of development.
    `,
    excerpt: 'Explore how artificial intelligence is changing the landscape of web development and what the future might hold.',
    author: 'Alex Johnson',
    createdAt: '2023-09-05T09:15:00Z',
    readTime: 10,
    tags: ['AI', 'Web Development', 'Future Tech'],
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }
];

// Helper function to generate a random ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
}; 