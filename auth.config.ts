import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnCollector = nextUrl.pathname.startsWith('/collector');
      if (isOnCollector) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/collector', nextUrl));
      }
      return true;
    },
  },
  providers: [Credentials({})], // Add providers with an empty array for now
} satisfies NextAuthConfig;