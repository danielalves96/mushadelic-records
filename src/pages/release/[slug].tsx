/* eslint-disable @next/next/no-img-element */
import { ReleaseDocument } from '@/generated/graphql';
import React from 'react';
import { SiBeatport, SiSoundcloud, SiSpotify, SiYoutube } from 'react-icons/si';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { useQuery } from 'urql';

export default function Release() {
  const router = useRouter();
  const { slug } = router.query;

  const [result] = useQuery({
    query: ReleaseDocument,
    variables: { slug },
    requestPolicy: `cache-and-network`,
  });

  const release = result.data?.release;

  return (
    <>
      <div className="columns">
        <div className="column is-one-quarter">
          <img src={release?.cover_art?.url} alt="" />
        </div>
        <div className="column">
          <div className={styles.descriptionSection}>
            <span className={styles.title}>
              {release?.artist?.toUpperCase()} -{` `}
              {release?.music_name?.toUpperCase()}
            </span>
            <div className={styles.icons}>
              <a href={release?.buy_link} target="_blank" rel="noreferrer">
                <SiBeatport size={25} />
              </a>
              <a href={release?.sc_link} target="_blank" rel="noreferrer">
                <SiSoundcloud size={25} />
              </a>
              <a href={release?.sptfy_link} target="_blank" rel="noreferrer">
                <SiSpotify size={25} />
              </a>
              <a href={release?.yt_link} target="_blank" rel="noreferrer">
                <SiYoutube size={25} />
              </a>
            </div>
            <div className={styles.limitText}>
              <span>{release?.description}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: release?.iframe_sc,
        }}
      ></div>
    </>
  );
}
