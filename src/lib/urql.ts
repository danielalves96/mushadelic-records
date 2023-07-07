import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from 'urql';

const isServerSide = typeof window === `undefined`;

const ssrCache = ssrExchange({ isClient: !isServerSide });

const client = createClient({
  url: `https://api-sa-east-1.hygraph.com/v2/clcrrxpwx0itk01ue4dhrfvag/master`,
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
});

export { client, ssrCache };
