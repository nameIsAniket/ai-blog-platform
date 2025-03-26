# AI Blog Platform

A modern, AI-powered blog platform built with Next.js, TypeScript, and Tailwind CSS. This platform features a clean, minimalist design with smooth animations and a focus on content readability.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- ⚡ Fast page loads with Next.js
- 🔒 Authentication with NextAuth.js
- ✨ Smooth animations with Framer Motion
- 📱 Mobile-first approach
- 🎯 SEO optimized
- 📝 Rich text formatting with @tailwindcss/typography

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Date Handling**: date-fns
- **UI Components**: Custom components with class-variance-authority

## Prerequisites

- Node.js 18.x or later
- Yarn or npm package manager
- Git

## Getting Started

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nameIsAniket/ai-blog-platform.git
   cd ai-blog-platform
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # Authentication
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   
   # Database
   DATABASE_URL=your-database-url
   
   # OAuth (if using social login)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   
   # AI Features
   OPENAI_API_KEY=your-openai-api-key
   ```

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   yarn dev
   # or
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)** in your browser

### Production Deployment

1. **Build the application**
   ```bash
   yarn build
   # or
   npm run build
   ```

2. **Start the production server**
   ```bash
   yarn start
   # or
   npm start
   ```

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t ai-blog-platform .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 ai-blog-platform
   ```

## UI/UX Design System

### Design Principles
- **Minimalism**: Clean interfaces with focused content presentation
- **Consistency**: Uniform design patterns across all pages
- **Accessibility**: WCAG 2.1 compliance as a core requirement
- **Performance**: Optimized for fast loading and smooth interactions

### Color System
```css
--primary: #2563eb;     /* Blue 600 */
--secondary: #4b5563;   /* Gray 600 */
--accent: #8b5cf6;      /* Violet 500 */
--background: #ffffff;  /* Light mode */
--background-dark: #111827; /* Dark mode */
--text: #1f2937;       /* Gray 800 */
--text-light: #6b7280; /* Gray 500 */
```

### Typography Scale
```css
--font-xs: 0.75rem;    /* 12px */
--font-sm: 0.875rem;   /* 14px */
--font-base: 1rem;     /* 16px */
--font-lg: 1.125rem;   /* 18px */
--font-xl: 1.25rem;    /* 20px */
--font-2xl: 1.5rem;    /* 24px */
--font-3xl: 1.875rem;  /* 30px */
```

### Spacing System
```css
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-12: 3rem;      /* 48px */
```

### Component Design
- **Buttons**: 
  - Primary: Solid background with hover state
  - Secondary: Outlined with hover state
  - Ghost: Text-only with hover background
  
- **Cards**:
  - Subtle shadow: `0 1px 3px rgba(0,0,0,0.12)`
  - Hover lift: Transform scale of 1.02
  - Border radius: 0.5rem (8px)

- **Inputs**:
  - Consistent padding: 0.75rem (12px)
  - Clear focus states
  - Validation states with color coding

### Animation Guidelines
- **Transitions**:
  - Duration: 200ms for UI elements
  - Timing: ease-in-out
  - Properties: opacity, transform, background-color

- **Loading States**:
  - Skeleton screens for content loading
  - Pulse animation for loading indicators
  - Smooth fade-ins for loaded content

### Responsive Breakpoints
```css
--sm: 640px;   /* Mobile landscape */
--md: 768px;   /* Tablets */
--lg: 1024px;  /* Desktop */
--xl: 1280px;  /* Large desktop */
--2xl: 1536px; /* Extra large screens */
```

### Dark Mode Implementation
- System preference detection
- Manual toggle option
- Persistent user preference storage
- Smooth transition between modes

## Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build the production application
- `yarn start` - Start the production server
- `yarn lint` - Run ESLint for code linting

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- All contributors and maintainers
