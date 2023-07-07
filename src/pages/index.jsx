/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout';
import { useReleasesQuery } from '@/generated/graphql';
import styles from '@/styles/styles.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { FilterInput } from '../components/FilterInput';

export default function Home() {
  const [value, setValue] = useState('');
  const [{ data }] = useReleasesQuery();

  function filterTracks(e) {
    const query = e.target.value;
    setValue(query);
    const filteredReleases = data?.releases.filter(
      (release) =>
        release.music_name.toLowerCase().indexOf(query.toLowerCase()) > -1,
    );
    setReleases(filteredReleases);
    return;
  }

  const [releases, setReleases] = useState([]);

  useEffect(() => {
    const getReleases = async () => {
      await setReleases(data?.releases);
    };

    getReleases();
  }, [data]);

  return (
    <Layout>
      <FilterInput
        value={value}
        filter={filterTracks}
        placeholder="Search Releases"
      />
      <div className="mb-5">
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            350: 1,
            750: 2,
            1000: 4,
            1300: 5,
            1500: 6,
          }}
        >
          <Masonry>
            {releases?.map((release) => (
              <Link href={`/release/${release.slug}`} key={release.id}>
                <div className={styles.imageMargin}>
                  <img src={release.cover_art.url} alt={release.music_name} />
                </div>
              </Link>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </Layout>
  );
}
