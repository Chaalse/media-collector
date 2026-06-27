import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { getUser } from './lib/repository/users';
import { authConfig } from './auth.config';
  
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email() })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          return user;
        }
 
        return null;
      },
    }),
  ],
});