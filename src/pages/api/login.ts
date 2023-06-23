import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import fetch from 'isomorphic-fetch';
import { NextApiRequest, NextApiResponse } from 'next';
import { LoginDocument } from '@/generated/graphql';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { username } = req.query;

    const client = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: `https://api-sa-east-1.hygraph.com/v2/clcrrxpwx0itk01ue4dhrfvag/master`,
        fetch,
      }),
      cache: new InMemoryCache(),
    });

    const response = await client.query({
      query: LoginDocument,
      variables: {
        username,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Erro na solicitação GraphQL:`, error);
    res.status(500).json({
      message: `Erro na solicitação GraphQL`,
    });
  }
}
