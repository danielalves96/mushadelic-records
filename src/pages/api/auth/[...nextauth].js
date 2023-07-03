import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Username', type: 'mail', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/login?username=${credentials.email}`,
          );
          if (response.ok) {
            const data = await response.json();

            const correctPassword =
              data.dashboard.password === credentials.password ? true : false;

            const user = {
              id: data.dashboard.id,
              name: data.dashboard.username,
              email: data.dashboard.email,
            };

            if (user && correctPassword) {
              return user;
            } else {
              return null;
            }
          } else {
            throw new Error('Erro na solicitação');
          }
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
