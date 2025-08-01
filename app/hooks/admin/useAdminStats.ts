import { useApiData } from '@/hooks/common/useApiData';
import { useRefreshEffect } from '@/hooks/common/useRefreshEffect';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

export interface AdminStats {
  totalArtists: number;
  totalReleases: number;
  castingArtists: number;
}

export const useAdminStats = () => {
  const { artistsRefreshTrigger, releasesRefreshTrigger } = useDataRefresh();
  const result = useApiData<AdminStats>('/api/admin/stats');

  // Refresh stats when artists or releases change
  useRefreshEffect(artistsRefreshTrigger, result.refetch);
  useRefreshEffect(releasesRefreshTrigger, result.refetch);

  return result;
};
