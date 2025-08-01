import { useApiMutation } from '@/hooks/common/useApiData';
import api from '@/lib/axios';

const deleteRelease = async (releaseId: string): Promise<void> => {
  const response = await api.delete(`/api/release/delete/${releaseId}`);
  return response.data;
};

export const useDeleteRelease = () => {
  return useApiMutation<void, string>(deleteRelease);
};
