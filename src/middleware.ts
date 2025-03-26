import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Check if the request is for the API
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');
  const isAuthRoute = request.nextUrl.pathname.startsWith('/api/auth');
  
  // Allow all GET requests
  if (request.method === 'GET') {
    return NextResponse.next();
  }
  
  // Allow all auth-related requests
  if (isAuthRoute) {
    return NextResponse.next();
  }
  
  // For non-GET API requests, check authentication
  if (isApiRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    
    // If not authenticated and trying to access protected route, redirect to login
    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  }
  
  return NextResponse.next();
}

// Define which routes this middleware applies to
export const config = {
  matcher: [
    // Apply to all API routes
    '/api/:path*',
  ],
}; 