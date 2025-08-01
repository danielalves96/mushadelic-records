import { useEffect } from 'react';

import { useApiData } from '@/hooks/common/useApiData';
import { Release } from '@/types/types';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

export const useReleases = () => {
  const { refreshTrigger } = useDataRefresh();
  const result = useApiData<Release[]>('/api/release/list');

  // Re-fetch when refresh is triggered
  useEffect(() => {
    if (refreshTrigger > 0) {
      result.refetch();
    }
  }, [refreshTrigger, result.refetch]);

  return result;
};
