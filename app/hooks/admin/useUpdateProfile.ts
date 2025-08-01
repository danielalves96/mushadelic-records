import { useSession } from 'next-auth/react';

import { useApiMutation } from '@/hooks/common/useApiData';
import api from '@/lib/axios';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: 'STAFF' | 'ADMIN' | 'ARTIST';
}

interface UpdateProfileData {
  name: string;
  email: string;
  image?: string | null;
  currentPassword?: string;
  newPassword?: string;
}

const updateProfile = async (data: UpdateProfileData): Promise<User> => {
  const response = await api.put('/api/admin/profile', data, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });

  return response.data;
};

export const useUpdateProfile = () => {
  const { refreshData } = useDataRefresh();
  const { update } = useSession();

  const mutation = useApiMutation<User, UpdateProfileData>(updateProfile);

  const mutate = async (
    data: UpdateProfileData,
    options?: { onSuccess?: (data: User) => void; onError?: (error: string) => void }
  ) => {
    return mutation.mutate(data, {
      onSuccess: async (updatedUser) => {
        refreshData();

        // Update the session with new user data
        await update({
          name: updatedUser.name,
          email: updatedUser.email,
          image: updatedUser.image,
        });

        options?.onSuccess?.(updatedUser);
      },
      onError: options?.onError,
    });
  };

  const mutateAsync = async (data: UpdateProfileData) => {
    return mutation.mutateAsync(data);
  };

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
