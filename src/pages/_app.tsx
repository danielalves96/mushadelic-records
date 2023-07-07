import '@/styles/global.scss';
import { AppProps } from 'next/app';
// import Layout from '../components/Layout';
import { Provider } from 'urql';
import { client as urqlClient } from '../../src/lib/urql';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client';
import client from '../../apollo';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Provider value={urqlClient}>
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
    </SessionProvider>
  );
}
