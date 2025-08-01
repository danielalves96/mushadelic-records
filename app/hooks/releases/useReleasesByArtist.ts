import { useEffect } from 'react';

import { useApiData } from '@/hooks/common/useApiData';
import { Release } from '@/types/types';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

export const useReleasesByArtist = (artistId: string) => {
  const { refreshTrigger } = useDataRefresh();
  const result = useApiData<Release[]>(`/api/release/by-artist/${artistId}`, {
    enabled: !!artistId,
  });

  useEffect(() => {
    if (refreshTrigger > 0 && artistId) {
      result.refetch();
    }
  }, [refreshTrigger, result.refetch, artistId]);

  return result;
};
