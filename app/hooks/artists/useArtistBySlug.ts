import { useQuery } from '@tanstack/react-query';

const fetchArtistBySlug = async (slug: string) => {
  const response = await fetch('/api/artist/casting/list');
  if (!response.ok) {
    throw new Error('Failed to fetch artist');
  }
  const data = await response.json();
  return data.find((artist: any) => artist.casting_artist.slug === slug);
};

export const useArtistBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['artist', slug],
    queryFn: () => fetchArtistBySlug(slug),
    enabled: !!slug,
  });
};
