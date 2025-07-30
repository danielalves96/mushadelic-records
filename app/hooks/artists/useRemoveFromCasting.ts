import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { useQueryInvalidation } from '../common/useQueryInvalidation';

const removeFromCasting = async (artistId: string) => {
  const response = await axios.delete(`/api/artist/remove-from-casting/${artistId}`);
  return response.data;
};

export const useRemoveFromCasting = () => {
  const { invalidateArtists } = useQueryInvalidation();

  return useMutation({
    mutationFn: removeFromCasting,
    onSuccess: () => {
      invalidateArtists();
    },
  });
};
