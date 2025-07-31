import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

interface UpdateProfileData {
  name: string;
  email: string;
  image?: string | null;
  currentPassword?: string;
  newPassword?: string;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { update } = useSession();

  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update profile');
      }

      return response.json();
    },
    onSuccess: async (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ['admin-profile'] });

      // Update the session with new user data
      await update({
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
      });
    },
  });
};
