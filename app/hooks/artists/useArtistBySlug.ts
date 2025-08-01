import { useEffect } from 'react';

import { useApiData } from '@/hooks/common/useApiData';
import { Artist } from '@/types/types';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

export const useArtistBySlug = (slug: string) => {
  const { refreshTrigger } = useDataRefresh();

  const result = useApiData<Artist[]>('/api/artist/casting/list', { enabled: !!slug });

  // Transform the data to find the specific artist by slug
  const transformedResult = {
    ...result,
    data:
      result.data && Array.isArray(result.data)
        ? result.data.find((artist: Artist) => artist.casting_artist.slug === slug)
        : null,
  };

  useEffect(() => {
    if (refreshTrigger > 0) {
      result.refetch();
    }
  }, [refreshTrigger, result.refetch]);

  return transformedResult;
};
