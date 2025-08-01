import { useEffect } from 'react';

import { useApiData } from '@/hooks/common/useApiData';
import { Artist } from '@/types/types';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

export const useArtists = () => {
  const { refreshTrigger } = useDataRefresh();
  const result = useApiData<Artist[]>('/api/artist/list');

  // Re-fetch when refresh is triggered
  useEffect(() => {
    if (refreshTrigger > 0) {
      result.refetch();
    }
  }, [refreshTrigger, result.refetch]);

  return result;
};
