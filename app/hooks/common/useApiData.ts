import { useCallback, useEffect, useState } from 'react';

import api from '@/lib/axios';

interface UseApiDataOptions {
  enabled?: boolean;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface PendingRequest {
  promise: Promise<any>;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();
const pendingRequests = new Map<string, PendingRequest>();
const CACHE_TTL = 10000; // 10 segundos

function getCachedData<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

function setCachedData<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

function getPendingRequest(key: string): Promise<any> | null {
  const pending = pendingRequests.get(key);
  if (!pending) return null;

  if (Date.now() - pending.timestamp > 5000) {
    // 5s timeout
    pendingRequests.delete(key);
    return null;
  }

  return pending.promise;
}

function setPendingRequest(key: string, promise: Promise<any>): void {
  pendingRequests.set(key, {
    promise,
    timestamp: Date.now(),
  });
}

export function useApiData<T = any>(url: string, options: UseApiDataOptions = { enabled: true }) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (bypassCache = false) => {
      try {
        setError(null);

        if (!bypassCache) {
          // Check cache first
          const cachedData = getCachedData<T>(url);
          if (cachedData) {
            setData(cachedData);
            setIsLoading(false);
            return;
          }

          // Check if there's already a pending request for this URL
          const pendingRequest = getPendingRequest(url);
          if (pendingRequest) {
            const result = await pendingRequest;
            setData(result);
            setIsLoading(false);
            return;
          }
        }

        setIsLoading(true);

        // Create and store the request promise
        const requestPromise = api.get(url).then((response) => {
          const responseData = response.data;
          setCachedData(url, responseData);
          pendingRequests.delete(url); // Clean up
          return responseData;
        });

        if (!bypassCache) {
          setPendingRequest(url, requestPromise);
        }

        const responseData = await requestPromise;
        setData(responseData);
      } catch (err) {
        pendingRequests.delete(url); // Clean up on error
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    },
    [url]
  );

  const refetch = useCallback(() => {
    fetchData(true); // Bypass cache on manual refetch
  }, [fetchData]);

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

export function useApiMutation<TData = any, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  globalOptions?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: string) => void;
  }
) {
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
      globalOptions?.onSuccess?.(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      options?.onError?.(errorMessage);
      globalOptions?.onError?.(errorMessage);
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
