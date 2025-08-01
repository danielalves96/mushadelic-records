import { useCallback, useEffect, useMemo, useState } from 'react';

import api from '@/lib/axios';
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

  // Memoize artistIds to prevent infinite re-renders
  const memoizedArtistIds = useMemo(() => artistIds, [artistIds.join(',')]);

  const fetchReleasesByArtists = useCallback(async () => {
    if (!memoizedArtistIds.length) {
      setAllReleases([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/api/release/by-artists', {
        artistIds: memoizedArtistIds,
        excludeReleaseId: currentReleaseId,
      });

      const releases = response.data;

      // Shuffle releases if there are multiple artists to avoid showing only one artist's releases
      const filteredReleases = memoizedArtistIds.length > 1 && releases.length > 1 ? shuffleArray(releases) : releases;

      setAllReleases(filteredReleases);
    } catch (err) {
      console.error('Failed to fetch related releases:', err);
      setError('Failed to fetch related releases');
      setAllReleases([]);
    } finally {
      setLoading(false);
    }
  }, [memoizedArtistIds, currentReleaseId]);

  useEffect(() => {
    if (memoizedArtistIds.length > 0) {
      fetchReleasesByArtists();
    } else {
      setAllReleases([]);
      setLoading(false);
    }
  }, [memoizedArtistIds.length, currentReleaseId, fetchReleasesByArtists]);

  useEffect(() => {
    if (refreshTrigger > 0) {
      fetchReleasesByArtists();
    }
  }, [refreshTrigger, fetchReleasesByArtists]);

  return {
    data: allReleases,
    isLoading: loading,
    isError: !!error,
    error,
    refetch: fetchReleasesByArtists,
  };
};
