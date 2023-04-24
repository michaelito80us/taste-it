import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface User {
  id: number;
  slug: string;
  name: string;
  email: string;
}

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@aol.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const res = await fetch('http://127.0.0.1:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include', // this tells the browser to send the cookie
        });
        // tipar peticion de user
        const { user } = await res.json();

        console.log('------------- here --------------');
        console.log({ user });
        if (res.ok && user) {
          // mostrar el encabezado de autorización en la consola
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // jwt: async ({ token, user }) => {
    //   if (user) token = user as unknown as { [key: string]: any };
    //   // console.log(token);

    //   return token;
    // },
    session: async ({ session, token }) => {
      console.log('token: ', token);
      session.user = { ...token };
      console.log({ session });
      return Promise.resolve(session);
    },
  },
  secret: 'supersecret',
  pages: {
    signIn: '/auth/login',
  },
});

export { handler as GET, handler as POST };
