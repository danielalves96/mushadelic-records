import { useQueryClient } from '@tanstack/react-query';

export const useQueryInvalidation = () => {
  const queryClient = useQueryClient();

  const invalidateReleases = () => {
    queryClient.invalidateQueries({ queryKey: ['releases'] });
  };

  const invalidateRelease = (slug: string) => {
    queryClient.invalidateQueries({ queryKey: ['release', slug] });
  };

  const invalidateAllReleases = () => {
    queryClient.invalidateQueries({ queryKey: ['releases'] });
    queryClient.invalidateQueries({ queryKey: ['release'] });
  };

  const invalidateArtists = () => {
    queryClient.invalidateQueries({ queryKey: ['artists'] });
  };

  const invalidateArtist = (identifier: string) => {
    queryClient.invalidateQueries({ queryKey: ['artist', identifier] });
  };

  const invalidateAllArtists = () => {
    queryClient.invalidateQueries({ queryKey: ['artists'] });
    queryClient.invalidateQueries({ queryKey: ['artist'] });
  };

  const invalidateAll = () => {
    queryClient.invalidateQueries();
  };

  return {
    invalidateReleases,
    invalidateRelease,
    invalidateAllReleases,
    invalidateArtists,
    invalidateArtist,
    invalidateAllArtists,
    invalidateAll,
  };
};
