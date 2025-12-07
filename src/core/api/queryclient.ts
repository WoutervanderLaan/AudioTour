import {QueryClient} from '@tanstack/react-query'

/**
 * Global TanStack Query client instance with default configuration.
 *
 * Configured with:
 * - 5 minute stale time for queries
 * - 10 minute garbage collection time
 * - Single retry on failure
 * - No refetch on window focus or mount
 * - No retry for mutations
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    mutations: {
      retry: 0,
    },
  },
})

// Helper to invalidate module queries
/**
 * invalidateModuleQueries
 * Invalidates all TanStack Query queries that belong to a specific module based on query key prefix.
 *
 * @param moduleName - Name of the module whose queries should be invalidated
 * @returns Promise that resolves when all matching queries have been invalidated
 */
export const invalidateModuleQueries = (moduleName: string): Promise<void> => {
  return queryClient.invalidateQueries({
    predicate: query => {
      const queryKey = query.queryKey[0]
      return typeof queryKey === 'string' && queryKey.startsWith(moduleName)
    },
  })
}

// Helper to clear module queries
/**
 * clearModuleQueries
 * Removes all TanStack Query queries that belong to a specific module based on query key prefix from the cache.
 *
 * @param moduleName - Name of the module whose queries should be removed
 * @returns void
 */
export const clearModuleQueries = (moduleName: string): void => {
  return queryClient.removeQueries({
    predicate: query => {
      const queryKey = query.queryKey[0]
      return typeof queryKey === 'string' && queryKey.startsWith(moduleName)
    },
  })
}
