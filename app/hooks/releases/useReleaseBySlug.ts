import { useEffect } from 'react';

import { useApiData } from '@/hooks/common/useApiData';
import { Release } from '@/types/types';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

export const useReleaseBySlug = (slug: string) => {
  const { refreshTrigger } = useDataRefresh();
  const result = useApiData<Release>(`/api/release/${slug}`, {
    enabled: !!slug,
  });

  // Re-fetch when refresh is triggered
  useEffect(() => {
    if (refreshTrigger > 0 && slug) {
      result.refetch();
    }
  }, [refreshTrigger, slug]);

  return result;
};
