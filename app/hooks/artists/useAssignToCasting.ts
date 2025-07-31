import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { useQueryInvalidation } from '../common/useQueryInvalidation';

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

const assignToCasting = async ({ artistId, data }: { artistId: string; data: AssignToCastingData }) => {
  const response = await axios.post(`/api/artist/assign-to-casting/${artistId}`, data);
  return response.data;
};

export const useAssignToCasting = () => {
  const { invalidateAllArtists } = useQueryInvalidation();

  return useMutation({
    mutationFn: assignToCasting,
    onSuccess: () => {
      invalidateAllArtists();
    },
  });
};
