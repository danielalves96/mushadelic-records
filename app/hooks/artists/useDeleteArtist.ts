import { useApiMutation } from '@/hooks/common/useApiData';
import api from '@/lib/axios';

const deleteArtist = async (artistId: string): Promise<void> => {
  const response = await api.delete(`/api/artist/delete/${artistId}`);
  return response.data;
};

export const useDeleteArtist = () => {
  return useApiMutation<void, string>(deleteArtist);
};
