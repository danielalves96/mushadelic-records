import { useEffect } from 'react';

import { useApiData } from '@/hooks/common/useApiData';
import { Artist } from '@/types/types';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

export const useArtistById = (artistId: string) => {
  const { refreshTrigger } = useDataRefresh();
  const result = useApiData<Artist>(`/api/artist/by-id/${artistId}`, { enabled: !!artistId });

  useEffect(() => {
    if (refreshTrigger > 0) {
      result.refetch();
    }
  }, [refreshTrigger, result.refetch]);

  return result;
};
