import { useQuery } from '@tanstack/react-query';

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: 'STAFF' | 'ADMIN' | 'ARTIST';
}

export const useProfile = () => {
  return useQuery<User>({
    queryKey: ['admin-profile'],
    queryFn: async () => {
      const response = await fetch('/api/admin/profile', {
        headers: {
          'Cache-Control': 'no-store',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      return response.json();
    },
  });
};
