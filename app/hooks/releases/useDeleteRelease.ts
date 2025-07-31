import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { useQueryInvalidation } from '../common/useQueryInvalidation';

const deleteRelease = async (releaseId: string) => {
  const response = await axios.delete(`/api/release/delete/${releaseId}`);
  return response.data;
};

export const useDeleteRelease = () => {
  const { invalidateAllReleases } = useQueryInvalidation();

  return useMutation({
    mutationFn: deleteRelease,
    onSuccess: () => {
      invalidateAllReleases();
    },
  });
};
