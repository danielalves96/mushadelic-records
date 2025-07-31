import { useQuery } from '@tanstack/react-query';

import { Artist } from '@/types/types';

const fetchArtistById = async (artistId: string) => {
  const response = await fetch(`/api/artist/by-id/${artistId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch artist');
  }
  return response.json();
};

export const useArtistById = (artistId: string) => {
  return useQuery<Artist>({
    queryKey: ['artist', artistId],
    queryFn: () => fetchArtistById(artistId),
    enabled: !!artistId, // Only run the query if artistId is available
  });
};
