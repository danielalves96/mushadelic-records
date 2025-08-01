import { useEffect } from 'react';

import { useApiData, useApiMutation } from '@/hooks/common/useApiData';
import api from '@/lib/axios';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: 'STAFF' | 'ADMIN' | 'ARTIST';
  emailVerified: Date | null;
  _count: {
    accounts: number;
    sessions: number;
  };
}

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: 'STAFF' | 'ADMIN' | 'ARTIST';
  image?: string;
}

interface UpdateUserData {
  name: string;
  email: string;
  role: 'STAFF' | 'ADMIN' | 'ARTIST';
  password?: string;
  image?: string;
}

export const useUsers = () => {
  const { refreshTrigger } = useDataRefresh();
  const result = useApiData<User[]>('/api/admin/users');

  useEffect(() => {
    if (refreshTrigger > 0) {
      result.refetch();
    }
  }, [refreshTrigger, result.refetch]);

  return result;
};

export const useUser = (userId: string) => {
  const { refreshTrigger } = useDataRefresh();
  const result = useApiData<User>(`/api/admin/users/${userId}`, { enabled: !!userId });

  useEffect(() => {
    if (refreshTrigger > 0) {
      result.refetch();
    }
  }, [refreshTrigger, result.refetch]);

  return result;
};

const createUser = async (data: CreateUserData): Promise<User> => {
  const response = await api.post('/api/admin/users', data);
  return response.data;
};

export const useCreateUser = () => {
  return useApiMutation(createUser);
};

const updateUser = async ({ userId, data }: { userId: string; data: UpdateUserData }): Promise<User> => {
  const response = await api.put(`/api/admin/users/${userId}`, data);
  return response.data;
};

export const useUpdateUser = () => {
  return useApiMutation(updateUser);
};

const deleteUser = async (userId: string): Promise<void> => {
  const response = await api.delete(`/api/admin/users/${userId}`);
  return response.data;
};

export const useDeleteUser = () => {
  return useApiMutation(deleteUser);
};
