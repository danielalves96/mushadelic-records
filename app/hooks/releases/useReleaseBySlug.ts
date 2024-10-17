import { useQuery } from '@tanstack/react-query';

const fetchReleaseBySlug = async (slug: string) => {
  const res = await fetch(`/api/release/${slug}`);
  if (!res.ok) {
    throw new Error('Failed to fetch release');
  }
  return res.json();
};

export const useReleaseBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['release', slug],
    queryFn: () => fetchReleaseBySlug(slug),
    enabled: !!slug,
  });
};
