import { useApiMutation } from '@/hooks/common/useApiData';
import api from '@/lib/axios';
import { useDataRefresh } from '../../../providers/data-refresh-provider';

const deleteRelease = async (releaseId: string): Promise<void> => {
  const response = await api.delete(`/api/release/delete/${releaseId}`);
  return response.data;
};

export const useDeleteRelease = () => {
  const { refreshData } = useDataRefresh();

  return useApiMutation<void, string>(deleteRelease, {
    onSuccess: () => {
      refreshData(); // Trigger refresh of all lists
    },
  });
};
