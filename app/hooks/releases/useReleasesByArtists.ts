import { useEffect, useState } from 'react';

import { Release } from '@/types/types';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

// Fisher-Yates shuffle algorithm
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useReleasesByArtists = (artistIds: string[], currentReleaseId?: string) => {
  const { refreshTrigger } = useDataRefresh();
  const [allReleases, setAllReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReleasesByArtists = async () => {
      if (!artistIds.length) {
        setAllReleases([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const promises = artistIds.map((artistId) =>
          fetch(`/api/release/by-artist/${artistId}`)
            .then((res) => {
              if (!res.ok) {
                console.warn(`Failed to fetch releases for artist ${artistId}:`, res.status);
                return [];
              }
              return res.json();
            })
            .catch((err) => {
              console.warn(`Error fetching releases for artist ${artistId}:`, err);
              return [];
            })
        );

        const results = await Promise.all(promises);

        // Flatten and deduplicate releases
        const flatReleases = results.flat().filter((release) => release && release.id);
        const uniqueReleases = flatReleases.filter(
          (release, index, self) => index === self.findIndex((r) => r.id === release.id)
        );

        // Filter out current release if provided
        let filteredReleases = currentReleaseId
          ? uniqueReleases.filter((release) => release.id !== currentReleaseId)
          : uniqueReleases;

        // Shuffle releases if there are multiple artists to avoid showing only one artist's releases
        if (artistIds.length > 1 && filteredReleases.length > 1) {
          filteredReleases = shuffleArray(filteredReleases);
        }

        setAllReleases(filteredReleases);
      } catch (err) {
        console.error('Failed to fetch related releases:', err);
        setError('Failed to fetch related releases');
        setAllReleases([]);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we have valid artist IDs
    if (artistIds.length > 0) {
      fetchReleasesByArtists();
    } else {
      setAllReleases([]);
      setLoading(false);
    }
  }, [artistIds.join(','), currentReleaseId, refreshTrigger]); // Use join to avoid array reference issues

  return {
    data: allReleases,
    isLoading: loading,
    isError: !!error,
    error,
    refetch: () => {
      // Trigger re-fetch by updating refreshTrigger would be handled by the provider
    },
  };
};
