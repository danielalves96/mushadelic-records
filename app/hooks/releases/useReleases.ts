import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Release } from '@/types/types';

const fetchReleases = async (): Promise<Release[]> => {
  const { data } = await axios.get('/api/release/list');
  return data;
};

export const useReleases = () => {
  return useQuery<Release[]>({
    queryKey: ['releases'],
    queryFn: fetchReleases,
    staleTime: 0,
  });
};
