import { NextResponse } from 'next/server';

export const authConfig = {
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 2 * 60 * 60, // 2 hours
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const nextUrl = request.nextUrl;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      // Log para depuración
      // console.log('isLoggedIn:', isLoggedIn, 'isOnDashboard:', isOnDashboard);
      // console.log('nextUrl:', nextUrl.pathname);

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return NextResponse.redirect(new URL('/login', nextUrl));
      } else if (
        isLoggedIn &&
        (nextUrl.pathname === '/' || nextUrl.pathname === '/login')
      ) {
        return NextResponse.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add a list of authentication providers here
};
