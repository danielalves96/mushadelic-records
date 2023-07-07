import React from 'react';
import { ReleaseDocument } from '@/generated/graphql';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { useQuery } from 'urql';

function SocialCard({ link, logo }: any) {
  return (
    <>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          style={{
            width: `100%`,
          }}
        >
          <div
            className="card"
            style={{
              backgroundColor: `#242323`,
              width: `100%`,
              display: `flex`,
              justifyContent: `center`,
              alignItems: `center`,
              padding: 20,
              cursor: `pointer`,
              height: 80,
            }}
          >
            <img src={logo} alt="" width={110} />
          </div>
        </a>
      )}
    </>
  );
}

const Share: React.FC = () => {
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
      <div
        style={{
          backgroundImage: `url(${release?.cover_art?.url})`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: `cover`,
          filter: `blur(20px) opacity(0.7)`,
          width: `100%`,
          height: `100%`,
          position: `fixed`,
        }}
      />
      <div
        className="container is-max-desktop"
        style={{ maxWidth: 450, padding: 30 }}
      >
        <img
          src={release?.cover_art?.url}
          alt="image"
          style={{ borderRadius: 10 }}
        />
        <div
          style={{
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            paddingTop: 10,
            color: `white`,
            fontWeight: 500,
            paddingLeft: 5,
            paddingRight: 5,
            flexDirection: `column`,
            gap: 20,
          }}
        >
          <span
            style={{ textAlign: `center`, textShadow: `2px 2px 8px #000000` }}
          >
            {`${release?.artist} - ${release?.music_name}`.toUpperCase()}
          </span>
        </div>
        <br />

        <div className={styles.socialCard}>
          <SocialCard
            link={release?.sptfy_link}
            logo="https://st.toneden.io/prod-assets/images/link-services/spotify.png"
          />
          <SocialCard
            link={release?.sc_link}
            logo="https://st.toneden.io/prod-assets/images/link-services/soundcloud.png"
          />
          <SocialCard
            link={release?.buy_link}
            logo="https://st.toneden.io/prod-assets/images/link-services/beatport.png"
          />
          <SocialCard
            link={release?.yt_link}
            logo="https://st.toneden.io/prod-assets/images/link-services/youtube.png"
          />
          <SocialCard
            link={release?.deezer_link}
            logo="https://st.toneden.io/prod-assets/images/link-services/deezer.png"
          />
          <SocialCard
            link={release?.apple_link}
            logo="https://st.toneden.io/prod-assets/images/link-services/apple-music.png"
          />
        </div>
        <div
          className="mt-6"
          style={{
            textAlign: `center`,
            textShadow: `2px 2px 8px #000000`,
            color: `#fff`,
            fontSize: 12,
          }}
        >
          <span>
            Developed by:{` `}
            <a href="https://daniel-luiz-alves.vercel.app/">Daniel Alves</a>
          </span>
        </div>
      </div>
    </>
  );
};

export default Share;
