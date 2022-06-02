import { Sidebar } from '../Sidebar';
import Head from 'next/head';
export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>Anunnaki Records</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />

      <div className="main">
        <div className="container is-fluid pt-5">{children}</div>
      </div>
    </>
  );
}
