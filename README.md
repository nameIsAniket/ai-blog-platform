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

1. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   # Add other required environment variables
   ```

4. Run the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build the production application
- `yarn start` - Start the production server
- `yarn lint` - Run ESLint for code linting

## UI/UX Design Choices

### Color Scheme
- Primary: A clean, modern color palette with emphasis on readability
- Background: Light/dark mode support with carefully chosen contrast ratios
- Accent colors: Used sparingly to highlight important elements

### Typography
- Font: Geist (Vercel's custom font) for optimal readability
- Hierarchical text structure with clear visual hierarchy
- Responsive font sizing for different screen sizes

### Layout
- Responsive grid system that adapts to different screen sizes
- Maximum content width for optimal readability
- Consistent spacing and padding throughout the application

### Animations
- Subtle transitions for page navigation
- Smooth hover effects on interactive elements
- Loading states with skeleton screens
- Micro-interactions for better user feedback

### Accessibility
- WCAG 2.1 compliance
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support
- Focus indicators for interactive elements

### Performance
- Optimized image loading
- Code splitting for faster initial load
- Lazy loading for below-the-fold content
- Optimized font loading


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- All contributors and maintainers
