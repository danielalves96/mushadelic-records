import { useQuery } from '@tanstack/react-query';

const fetchArtists = async () => {
  const response = await fetch('/api/artist/casting/list');
  if (!response.ok) {
    throw new Error('Failed to fetch artists');
  }
  return response.json();
};

export const useArtists = () => {
  return useQuery({
    queryKey: ['artists'],
    queryFn: fetchArtists,
  });
};
