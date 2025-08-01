import { useApiData } from '@/hooks/common/useApiData';
import { useRefreshEffect } from '@/hooks/common/useRefreshEffect';
import { Artist } from '@/types/types';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

export const useArtistById = (artistId: string) => {
  const { artistsRefreshTrigger } = useDataRefresh();
  const result = useApiData<Artist>(`/api/artist/by-id/${artistId}`, { enabled: !!artistId });

  useRefreshEffect(artistsRefreshTrigger, result.refetch);

  return result;
};
