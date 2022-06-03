/* eslint-disable @next/next/no-img-element */
import styles from '@/styles/styles.module.scss';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { FilterInput } from '../components/FilterInput';
import { db } from '../firebase-config';

export default function Home() {
  const [value, setValue] = useState('');
  function filterTracks(e) {
    const query = e.target.value;
    setValue(query);
    const filteredReleases = releasesMain.filter(
      (release) =>
        release.music_name.toLowerCase().indexOf(query.toLowerCase()) > -1,
    );
    setReleases(filteredReleases);
    return;
  }

  const [releases, setReleases] = useState([]);
  const [releasesMain, setReleasesMain] = useState([]);
  const releasesRef = collection(db, 'releases');

  function orderReleases(a, b) {
    if (a.release_number < b.release_number) {
      return 1;
    }
    if (a.release_number > b.release_number) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    const getReleases = async () => {
      const data = await getDocs(releasesRef);
      const releases = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setReleases(releases.sort(orderReleases));
      setReleasesMain(releases.sort(orderReleases));
    };

    getReleases();
  }, []);

  return (
    <>
      <FilterInput
        value={value}
        filter={filterTracks}
        placeholder="Search Releases"
      />
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 1000: 4, 1300: 5, 1500: 6 }}
      >
        <Masonry>
          {releases.map((release) => (
            <Link href={`/release/${release.slug}`} key={release.id}>
              <div className={styles.imageMargin}>
                <img src={release.cover_art} alt={release.music_name} />
              </div>
            </Link>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
}
