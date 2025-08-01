import { useApiMutation } from '@/hooks/common/useApiData';
import api from '@/lib/axios';
import { Release } from '@/types/types';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

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

const createRelease = async (data: CreateReleaseData): Promise<Release> => {
  const response = await api.post('/api/release/create', data);
  return response.data;
};

export const useCreateRelease = () => {
  const { refreshReleases } = useDataRefresh();

  return useApiMutation<Release, CreateReleaseData>(createRelease, {
    onSuccess: () => {
      refreshReleases(); // Trigger refresh only of releases data
    },
  });
};
