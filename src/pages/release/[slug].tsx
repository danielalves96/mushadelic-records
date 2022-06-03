/* eslint-disable @next/next/no-img-element */
import { db } from '@/firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import { SiBeatport, SiSoundcloud, SiSpotify, SiYoutube } from 'react-icons/si';
import styles from './styles.module.scss';

export default function Release({ releaseReturn }: any) {
  return (
    <>
      <div className="columns">
        <div className="column is-one-quarter">
          <img src={releaseReturn.cover_art} alt="" />
        </div>
        <div className="column">
          <div className={styles.descriptionSection}>
            <span className={styles.title}>
              {releaseReturn.artist.toUpperCase()} -{` `}
              {releaseReturn.music_name.toUpperCase()}
            </span>
            <div className={styles.icons}>
              <a href={releaseReturn.buy_link} target="_blank" rel="noreferrer">
                <SiBeatport size={25} />
              </a>
              <a href={releaseReturn.sc_link} target="_blank" rel="noreferrer">
                <SiSoundcloud size={25} />
              </a>
              <a
                href={releaseReturn.sptfy_link}
                target="_blank"
                rel="noreferrer"
              >
                <SiSpotify size={25} />
              </a>
              <a href={releaseReturn.yt_link} target="_blank" rel="noreferrer">
                <SiYoutube size={25} />
              </a>
            </div>
            <div className={styles.limitText}>
              <span>{releaseReturn.description}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: releaseReturn?.iframe_sc,
        }}
      ></div>
    </>
  );
}

export async function getStaticProps(context: any) {
  const releasesRef = collection(db, `releases`);

  const q = query(releasesRef, where(`slug`, `==`, `${context.params.slug}`));

  const data = await getDocs(q);
  const release = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  const releaseReturn = release.shift();

  return {
    props: { releaseReturn },
  };
}

export async function getStaticPaths() {
  const releasesRef = collection(db, `releases`);

  const data = await getDocs(releasesRef);
  const releases = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  const releasesPaths = releases.map((release: any) => {
    return {
      params: {
        slug: `${release.slug}`,
      },
    };
  });

  return {
    paths: releasesPaths,
    fallback: false,
  };
}
