import { useApiData } from '@/hooks/common/useApiData';
import { useRefreshEffect } from '@/hooks/common/useRefreshEffect';
import { Artist } from '@/types/types';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

export const useArtistBySlug = (slug: string) => {
  const { artistsRefreshTrigger } = useDataRefresh();

  const result = useApiData<Artist>(`/api/artist/${slug}`, { enabled: !!slug });

  useRefreshEffect(artistsRefreshTrigger, result.refetch);

  return result;
};
