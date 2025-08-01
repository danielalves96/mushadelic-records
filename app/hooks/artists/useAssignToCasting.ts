import { useApiMutation } from '@/hooks/common/useApiData';
import api from '@/lib/axios';
import { Artist } from '@/types/types';

interface AssignToCastingData {
  description: string;
  facebook_link?: string;
  instagram_link?: string;
  soundcloud_link?: string;
  spotify_link?: string;
  youtube_link?: string;
  flag?: string;
  picture?: string;
}

const assignToCasting = async ({
  artistId,
  data,
}: {
  artistId: string;
  data: AssignToCastingData;
}): Promise<Artist> => {
  const response = await api.post(`/api/artist/assign-to-casting/${artistId}`, data);
  return response.data;
};

export const useAssignToCasting = () => {
  return useApiMutation<Artist, { artistId: string; data: AssignToCastingData }>(assignToCasting);
};
