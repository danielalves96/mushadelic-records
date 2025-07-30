import { useQueryClient } from '@tanstack/react-query';

export const useQueryInvalidation = () => {
  const queryClient = useQueryClient();

  const invalidateReleases = () => {
    queryClient.invalidateQueries({ queryKey: ['releases'] });
  };

  const invalidateArtists = () => {
    queryClient.invalidateQueries({ queryKey: ['artists'] });
  };

  const invalidateAll = () => {
    queryClient.invalidateQueries();
  };

  return {
    invalidateReleases,
    invalidateArtists,
    invalidateAll,
  };
};
