import { useApiData } from '@/hooks/common/useApiData';
import { useRefreshEffect } from '@/hooks/common/useRefreshEffect';
import { Release } from '@/types/types';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

export const useReleaseBySlug = (slug: string) => {
  const { releasesRefreshTrigger } = useDataRefresh();
  const result = useApiData<Release>(`/api/release/${slug}`, {
    enabled: !!slug,
  });

  useRefreshEffect(releasesRefreshTrigger, result.refetch, [slug]);

  return result;
};
