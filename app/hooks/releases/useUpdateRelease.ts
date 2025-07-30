import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { useQueryInvalidation } from '../common/useQueryInvalidation';

interface UpdateReleaseData {
  music_name?: string;
  description?: string;
  buy_link?: string;
  cover_art?: string;
  soundcloud_link?: string;
  spotify_link?: string;
  youtube_link?: string;
  deezer_link?: string;
  apple_link?: string;
  release_date?: string;
  artistIds?: string[];
}

const updateRelease = async ({ releaseId, data }: { releaseId: string; data: UpdateReleaseData }) => {
  const response = await axios.patch(`/api/release/update/${releaseId}`, data);
  return response.data;
};

export const useUpdateRelease = () => {
  const { invalidateReleases } = useQueryInvalidation();

  return useMutation({
    mutationFn: updateRelease,
    onSuccess: () => {
      invalidateReleases();
    },
  });
};
