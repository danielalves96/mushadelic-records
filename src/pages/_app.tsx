import '@/styles/global.scss';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { Provider } from 'urql';
import { client } from '../../src/lib/urql';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}
