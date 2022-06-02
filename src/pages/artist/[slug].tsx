import React from 'react';
import { db } from '@/firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function Artist({ artistReturn }: any) {
  return (
    <>
      <div
        style={{ padding: `0.5rem` }}
        dangerouslySetInnerHTML={{
          __html: artistReturn?.iframe_sc,
        }}
      ></div>
    </>
  );
}

export async function getStaticProps(context: any) {
  const artistsRef = collection(db, `artists`);

  const q = query(artistsRef, where(`slug`, `==`, `${context.params.slug}`));

  const data = await getDocs(q);
  const artist = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  const artistReturn = artist.shift();

  return {
    props: { artistReturn },
  };
}

export async function getStaticPaths() {
  const artistsRef = collection(db, `artists`);

  const data = await getDocs(artistsRef);
  const artists = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  const artistsPaths = artists.map((artist: any) => {
    return {
      params: {
        slug: `${artist.slug}`,
      },
    };
  });

  return {
    paths: artistsPaths,
    fallback: false,
  };
}
