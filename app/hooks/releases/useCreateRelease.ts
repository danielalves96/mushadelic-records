import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { useQueryInvalidation } from '../common/useQueryInvalidation';

interface CreateReleaseData {
  music_name: string;
  description?: string;
  buy_link?: string;
  cover_art?: string;
  soundcloud_link?: string;
  spotify_link?: string;
  youtube_link?: string;
  deezer_link?: string;
  apple_link?: string;
  release_date: string;
  artistIds: string[];
}

const createRelease = async (data: CreateReleaseData) => {
  const response = await axios.post('/api/release/create', data);
  return response.data;
};

export const useCreateRelease = () => {
  const { invalidateReleases } = useQueryInvalidation();

  return useMutation({
    mutationFn: createRelease,
    onSuccess: () => {
      invalidateReleases();
    },
  });
};
