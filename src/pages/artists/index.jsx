/* eslint-disable @next/next/no-img-element */
import { FilterInput } from '@/components/FilterInput';
import { db } from '@/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import styles from './styles.module.scss';

export default function Home() {
  const [value, setValue] = useState('');
  function filterArtists(e) {
    const query = e.target.value;
    setValue(query);
    const filteredArtists = artistsMain.filter(
      (artist) =>
        artist.artist_name.toLowerCase().indexOf(query.toLowerCase()) > -1,
    );
    setArtists(filteredArtists);
    return;
  }

  const [artists, setArtists] = useState([]);
  const [artistsMain, setArtistsMain] = useState([]);
  const artistsRef = collection(db, 'artists');

  function orderArtists(a, b) {
    if (a.artist_number < b.artist_number) {
      return -1;
    }
    if (a.artist_number > b.artist_number) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    const getArtists = async () => {
      const data = await getDocs(artistsRef);
      const artists = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setArtists(artists.sort(orderArtists));
      setArtistsMain(artists.sort(orderArtists));
    };

    getArtists();
  }, []);

  return (
    <>
      <FilterInput
        value={value}
        filter={filterArtists}
        placeholder="Search Artists"
      />
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 1000: 4, 1300: 5, 1500: 6 }}
      >
        <Masonry>
          {artists.map((artist) => (
            <Link href={`/artist/${artist.slug}`} key={artist.id}>
              <div className={styles.imageMargin}>
                <div className={styles.flag}>
                  <img src={artist.flag} alt="flag" />
                </div>
                <img src={artist.picture} alt={artist.artist_name} />
                <div className={styles.nameSection}>
                  <span>{artist.artist_name.toUpperCase()}</span>
                </div>
              </div>
            </Link>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
}
