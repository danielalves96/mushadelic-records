import { useApiMutation } from '@/hooks/common/useApiData';
import api from '@/lib/axios';
import { Artist } from '@/types/types';

const removeFromCasting = async (artistId: string): Promise<Artist> => {
  const response = await api.delete(`/api/artist/remove-from-casting/${artistId}`);
  return response.data;
};

export const useRemoveFromCasting = () => {
  return useApiMutation<Artist, string>(removeFromCasting);
};
