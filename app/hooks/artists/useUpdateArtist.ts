import { useApiMutation } from '@/hooks/common/useApiData';
import api from '@/lib/axios';
import { Artist } from '@/types/types';

interface UpdateArtistData {
  name?: string;
  is_casting_artist?: boolean;
  description?: string;
  facebook_link?: string;
  instagram_link?: string;
  soundcloud_link?: string;
  spotify_link?: string;
  youtube_link?: string;
  flag?: string;
  picture?: string;
}

const updateArtist = async ({ artistId, data }: { artistId: string; data: UpdateArtistData }): Promise<Artist> => {
  const response = await api.patch(`/api/artist/update/${artistId}`, data);
  return response.data;
};

export const useUpdateArtist = () => {
  return useApiMutation<Artist, { artistId: string; data: UpdateArtistData }>(updateArtist);
};
