import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken");
  const response = NextResponse.next();
  
  // Skip middleware for auth callback route
  if (request.nextUrl.pathname.startsWith('/api/auth/callback')) {
    return response;
  }

  // Protected routes that require authentication
  const protectedPaths = ["/profile", "/orders"];
  const path = request.nextUrl.pathname;

  // Check if it's a protected route and no refresh token exists
  if (protectedPaths.some(route => path.startsWith(route)) && !refreshToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/orders/:path*',
    '/api/auth/callback'
  ]
};