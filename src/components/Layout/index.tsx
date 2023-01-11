import { Sidebar } from '../Sidebar';
import Head from 'next/head';
import Header from '../HeaderMobile';
export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>Mushadelic Records</title>
        <meta name="description" content="Brazilian Psytrance Label" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <Header />

      <div className="main">
        <div className="container is-fluid pt-5">{children}</div>
      </div>
    </>
  );
}
