/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './styles.module.scss';
import {
  SiBeatport,
  SiFacebook,
  SiInstagram,
  SiSoundcloud,
} from 'react-icons/si';
import Image from 'next/image';

export const Sidebar = () => {
  const router = useRouter();
  const route = router.pathname;

  return (
    <div className="is-hidden-mobile">
      <div className={styles.sidenav}>
        <Link href="/">
          <div className="px-6 mb-5 mt-3 pointer">
            <Image width="370" height="275" src="/images/logo.png" alt="logo" />
          </div>
        </Link>
        <div
          className={
            route === `/` || route.includes(`release`)
              ? styles.selectedMenu
              : ``
          }
        >
          <Link href="/">Releases</Link>
        </div>
        <div className={route.includes(`artist`) ? styles.selectedMenu : ``}>
          <Link href="/artists">Artists</Link>
        </div>
        <div className={route === `/demos` ? styles.selectedMenu : ``}>
          <Link href="/demos">Demos</Link>
        </div>
        <div className={route === `/contact` ? styles.selectedMenu : ``}>
          <Link href="/contact">Contact</Link>
        </div>

        <div className={styles.socialNetworks}>
          <a
            href="https://www.beatport.com/label/mushadelic-records/84164"
            target="_blank"
            rel="noreferrer"
          >
            <SiBeatport size={22} />
          </a>
          <a
            href="https://www.instagram.com/mushadelicrecords/"
            target="_blank"
            rel="noreferrer"
          >
            <SiInstagram size={22} />
          </a>
          <a
            href="https://www.facebook.com/mushadelicrec"
            target="_blank"
            rel="noreferrer"
          >
            <SiFacebook size={22} />
          </a>
          <a
            href="https://soundcloud.com/mushadelicrec"
            target="_blank"
            rel="noreferrer"
          >
            <SiSoundcloud size={22} />
          </a>
        </div>
      </div>
    </div>
  );
};
