import { useApiData } from '@/hooks/common/useApiData';
import { useRefreshEffect } from '@/hooks/common/useRefreshEffect';
import { Artist } from '@/types/types';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

export const useArtists = () => {
  const { artistsRefreshTrigger } = useDataRefresh();
  const result = useApiData<Artist[]>('/api/artist/list');

  useRefreshEffect(artistsRefreshTrigger, result.refetch);

  return result;
};
