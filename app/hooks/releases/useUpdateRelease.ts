import { useApiMutation } from '@/hooks/common/useApiData';
import api from '@/lib/axios';
import { Release } from '@/types/types';

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

const updateRelease = async ({ releaseId, data }: { releaseId: string; data: UpdateReleaseData }): Promise<Release> => {
  const response = await api.patch(`/api/release/update/${releaseId}`, data);
  return response.data;
};

export const useUpdateRelease = () => {
  return useApiMutation<Release, { releaseId: string; data: UpdateReleaseData }>(updateRelease);
};
