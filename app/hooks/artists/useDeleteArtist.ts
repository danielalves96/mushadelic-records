import { useMutation, useQueryClient } from '@tanstack/react-query';

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteArtist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] });
    },
  });
};