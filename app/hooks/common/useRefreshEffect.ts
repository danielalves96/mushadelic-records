import { useEffect } from 'react';

/**
 * Hook helper para gerenciar refresh effects de forma consistente
 */
export function useRefreshEffect(
  refreshTrigger: number,
  refetchFn: () => void,
  additionalDeps: React.DependencyList = []
) {
  useEffect(() => {
    if (refreshTrigger > 0) {
      refetchFn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger, ...additionalDeps]);
}
