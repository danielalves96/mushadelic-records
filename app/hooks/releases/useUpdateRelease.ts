import { useApiMutation } from '@/hooks/common/useApiData';
import api from '@/lib/axios';
import { Release } from '@/types/types';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

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
  const { refreshReleases } = useDataRefresh();

  return useApiMutation<Release, { releaseId: string; data: UpdateReleaseData }>(updateRelease, {
    onSuccess: () => {
      refreshReleases(); // Trigger refresh only of releases data
    },
  });
};
