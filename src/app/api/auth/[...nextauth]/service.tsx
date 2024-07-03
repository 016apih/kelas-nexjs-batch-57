import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { getUserByEmail } from '@/lib/actions';
import moment from 'moment';

export const authOptions: NextAuthOptions = {
   session: {
      strategy: 'jwt',
      maxAge: 1000 * 60 * 2
   },
   providers: [
      CredentialsProvider({
         name: 'Sign in with...',
         credentials: {
            email: { label: 'email', type: 'text', placeholder: 'Insert Email Here...' },
            password: { label: 'Password', type: 'password' }
         },
         async authorize(credentials, req) {

            const { email, password } = credentials as any;
            const user: any = await getUserByEmail(email, password);
            console.log(moment().format('DD-MM-YYYY HH:mm:ss:SSS'), " LOGIN ", user)

            if (user) {
               if (password == user?.password) {
                  return user;
               } else {
                  return null;
               }
            }
            // return user;
         },
      }),
   ],
   pages: {
      signIn: '/',
   },
   callbacks: {
      async signIn(signInc) {
         return true;
      },
      async jwt({ token, user, session }) {
         // check session id from redis
         // console.log("JWT CALLBACK", {token, user, session})
         if (user) {
            return {
               ...token,
               ...user
            };
         }
         return {
            ...token,
            // ...user,
         };
      },

      async redirect({ url, baseUrl }) {
         return baseUrl;
      },
      async session({ session, user, token }): Promise<any> {
         console.log("SESSION CALLBACK", { session, user, token})

         const { password, sessionID, ...data } = token;
         return {
            session: {
               ...session,
               user: {
                  ...session.user,
                  role: token.role,
                  name: token.fullname,
                  id: token.id
               }
            },
            role: token.role,
            name: token.fullname,
            ...data,
            sessionID,
         };
      },
   },
   events: {
      async signOut({ session, token }) {
      },
   }
};
