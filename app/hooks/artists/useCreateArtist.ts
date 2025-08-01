import { useApiMutation } from '@/hooks/common/useApiData';
import api from '@/lib/axios';
import { Artist } from '@/types/types';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

interface CreateArtistData {
  name: string;
}

const createArtist = async (data: CreateArtistData): Promise<Artist> => {
  const response = await api.post('/api/artist/create', data);
  return response.data;
};

export const useCreateArtist = () => {
  const { refreshData } = useDataRefresh();

  return useApiMutation<Artist, CreateArtistData>(createArtist, {
    onSuccess: () => {
      refreshData(); // Trigger refresh of all lists
    },
  });
};
