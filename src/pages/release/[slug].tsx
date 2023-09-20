/* eslint-disable @next/next/no-img-element */
import { ReleaseDocument } from '@/generated/graphql';
import React, { Fragment, useState } from 'react';
import { SiBeatport, SiSoundcloud, SiSpotify, SiYoutube } from 'react-icons/si';
import { FaChevronCircleLeft } from 'react-icons/fa';
import { GiShare } from 'react-icons/gi';
import styles from './styles.module.scss';
import { useQuery } from 'urql';
import Layout from '@/components/Layout';
import { ColorExtractor } from 'react-color-extractor';
import { useRouter } from 'next/router';

export default function Release() {
  const [color, setColor] = useState<string>(`#111111`);
  const router = useRouter();
  const { slug } = router.query;

  const [result] = useQuery({
    query: ReleaseDocument,
    variables: { slug },
    requestPolicy: `cache-and-network`,
  });

  const release = result.data?.release;

  return (
    <Layout>
      <div
        style={{
          background: `linear-gradient(0deg, #111111, ${color} 100%)`,
          borderRadius: `15px 15px 0px 0px`,
          paddingBottom: `4%`,
          marginBottom: 30,
          paddingLeft: 15,
          paddingRight: 15,
        }}
      >
        <div className="is-hidden-mobile">
          <div className={styles.backIcon}>
            <FaChevronCircleLeft size={30} onClick={() => router.back()} />
          </div>
        </div>

        <div className="columns">
          <div className="column is-one-fifth">
            <div className={styles.shine}>
              <ColorExtractor getColors={(colors) => setColor(colors[0])}>
                <img
                  className={styles.img}
                  src={release?.cover_art?.url}
                  alt="cover art"
                />
              </ColorExtractor>
            </div>
          </div>
          <div className="column">
            <div className={styles.descriptionSection}>
              <span className={styles.title}>
                {release?.music_name?.toUpperCase()}
              </span>
              <span className={styles.artist}>
                {release?.artist?.toUpperCase()}
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
                <a href={`/share/${slug}`} target="_blank" rel="noreferrer">
                  <GiShare size={25} />
                </a>
              </div>
              {/* <div className={styles.limitText}>
                <span>{release?.description}</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: release?.iframe_sc,
        }}
      ></div>
    </Layout>
  );
}
