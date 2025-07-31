import { useMutation } from '@tanstack/react-query';

import { useQueryInvalidation } from '../common/useQueryInvalidation';

const deleteArtist = async (artistId: string) => {
  const response = await fetch(`/api/artist/delete/${artistId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete artist');
  }

  return response.json();
};

export const useDeleteArtist = () => {
  const { invalidateAllArtists } = useQueryInvalidation();

  return useMutation({
    mutationFn: deleteArtist,
    onSuccess: () => {
      invalidateAllArtists();
    },
  });
};
