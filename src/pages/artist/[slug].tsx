/* eslint-disable @next/next/no-img-element */
import { db } from '@/firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import {
  SiFacebook,
  SiInstagram,
  SiSoundcloud,
  SiSpotify,
  SiYoutube,
} from 'react-icons/si';
import styles from './styles.module.scss';

export default function Artist({ artistReturn }: any) {
  return (
    <>
      <div className="columns">
        <div className="column is-one-quarter">
          <img src={artistReturn.picture} alt="" />
        </div>
        <div className="column">
          <div className={styles.descriptionSection}>
            <span className={styles.title}>
              {artistReturn.artist_name.toUpperCase()}
            </span>
            <div className={styles.icons}>
              <a
                href={artistReturn.instgrm_link}
                target="_blank"
                rel="noreferrer"
              >
                <SiInstagram size={25} />
              </a>
              <a href={artistReturn.fb_link} target="_blank" rel="noreferrer">
                <SiFacebook size={25} />
              </a>
              <a href={artistReturn.sc_link} target="_blank" rel="noreferrer">
                <SiSoundcloud size={25} />
              </a>
              <a
                href={artistReturn.sptfy_link}
                target="_blank"
                rel="noreferrer"
              >
                <SiSpotify size={25} />
              </a>
              <a href={artistReturn.yt_link} target="_blank" rel="noreferrer">
                <SiYoutube size={25} />
              </a>
            </div>
            <div className={styles.limitText}>
              <span>{artistReturn.description}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ padding: `0.5rem` }}
        dangerouslySetInnerHTML={{
          __html: artistReturn?.iframe_sc,
        }}
      />
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
