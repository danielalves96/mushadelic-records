import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { useQueryInvalidation } from '../common/useQueryInvalidation';

interface CreateArtistData {
  name: string;
}

const createArtist = async (data: CreateArtistData) => {
  const response = await axios.post('/api/artist/create', data);
  return response.data;
};

export const useCreateArtist = () => {
  const { invalidateAllArtists } = useQueryInvalidation();

  return useMutation({
    mutationFn: createArtist,
    onSuccess: () => {
      invalidateAllArtists();
    },
  });
};
