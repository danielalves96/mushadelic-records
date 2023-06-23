import '@/styles/global.scss';
import { AppProps } from 'next/app';
// import Layout from '../components/Layout';
import { Provider } from 'urql';
import { client } from '../../src/lib/urql';
import { SessionProvider } from 'next-auth/react';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider value={client}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
