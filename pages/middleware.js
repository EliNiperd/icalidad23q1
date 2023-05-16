import { NextResponse, NextRequest } from 'next/server';

export function middleware(NextRequest) {
  // Add a header to the response
  return NextResponse.redirect(new URL('/', 'http://localhost:3000'));
}

export const config = {
  matcher: '/RecoverPass/:path*', // Matched paths will be redirected
};
