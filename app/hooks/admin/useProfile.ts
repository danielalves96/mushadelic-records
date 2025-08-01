import { useSession } from 'next-auth/react';
import { useEffect, useMemo } from 'react';

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
  const { data: session, status } = useSession();
  const { refreshTrigger } = useDataRefresh();
  const apiResult = useApiData<Omit<User, 'role'>>('/api/admin/profile');

  useEffect(() => {
    if (refreshTrigger > 0) {
      apiResult.refetch();
    }
  }, [refreshTrigger, apiResult.refetch]);

  const data = useMemo(() => {
    if (!apiResult.data || !session?.user) return null;

    return {
      ...apiResult.data,
      role: session.user.role as 'STAFF' | 'ADMIN' | 'ARTIST',
    };
  }, [apiResult.data, session?.user]);

  return {
    ...apiResult,
    data,
    isLoading: apiResult.isLoading || status === 'loading',
  };
};
