import NextAuth, { User } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    credentials({
      name: 'Email',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        passwd: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.passwd)
          return null;

        console.log('🚀  credentials:', credentials);
        const user = {
          id: '1',
          email: credentials.email,
          name: '시온',
        } as User;
        return user;
      },
    }),
    Google,
    Github,
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const didLogin = !!auth?.user;
      console.log(
        '🚀 auth.ts > callbacks > authorized - didLogin:',
        didLogin,
        nextUrl.pathname
      );

      if (nextUrl.pathname.startsWith('/about')) {
        return didLogin;
      }
      if (didLogin) return Response.redirect(new URL('/about', nextUrl));

      return true;
    },
  },
});
