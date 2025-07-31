import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { useQueryInvalidation } from '../common/useQueryInvalidation';

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

const updateArtist = async ({ artistId, data }: { artistId: string; data: UpdateArtistData }) => {
  const response = await axios.patch(`/api/artist/update/${artistId}`, data);
  return response.data;
};

export const useUpdateArtist = () => {
  const { invalidateAllArtists } = useQueryInvalidation();

  return useMutation({
    mutationFn: updateArtist,
    onSuccess: () => {
      invalidateAllArtists();
    },
  });
};
