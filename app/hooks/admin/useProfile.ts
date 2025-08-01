import { useEffect } from 'react';

import { useApiData } from '@/hooks/common/useApiData';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: 'STAFF' | 'ADMIN' | 'ARTIST';
}

export const useProfile = () => {
  const { refreshTrigger } = useDataRefresh();
  const result = useApiData<User>('/api/admin/profile');

  useEffect(() => {
    if (refreshTrigger > 0) {
      result.refetch();
    }
  }, [refreshTrigger, result.refetch]);

  return result;
};
