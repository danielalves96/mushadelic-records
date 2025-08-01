import { useApiData } from '@/hooks/common/useApiData';
import { useRefreshEffect } from '@/hooks/common/useRefreshEffect';
import { Release } from '@/types/types';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

export const useReleaseById = (releaseId: string) => {
  const { releasesRefreshTrigger } = useDataRefresh();
  const result = useApiData<Release>(`/api/release/by-id/${releaseId}`, { enabled: !!releaseId });

  useRefreshEffect(releasesRefreshTrigger, result.refetch);

  return result;
};
