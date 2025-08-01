import { useCallback, useEffect, useState } from 'react';

import api from '@/lib/axios';

interface UseApiDataOptions {
  enabled?: boolean;
}

export function useApiData<T = any>(url: string, options: UseApiDataOptions = { enabled: true }) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get(url);
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    if (options.enabled) {
      fetchData();
    }
  }, [options.enabled, fetchData]);

  return {
    data,
    isLoading,
    error,
    isError: !!error,
    refetch,
  };
}

export function useApiMutation<TData = any, TVariables = any>(mutationFn: (variables: TVariables) => Promise<TData>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    variables: TVariables,
    options?: {
      onSuccess?: (data: TData) => void;
      onError?: (error: string) => void;
    }
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await mutationFn(variables);
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      options?.onError?.(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const mutateAsync = async (variables: TVariables) => {
    return mutate(variables);
  };

  return {
    mutate,
    mutateAsync,
    isLoading,
    isPending: isLoading,
    error,
  };
}
