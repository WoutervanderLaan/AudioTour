import {QueryClient} from '@tanstack/react-query'

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
 * TODO: describe what it does.
 *
 * @param {*} moduleName
 * @returns {*} describe return value
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
 * TODO: describe what it does.
 *
 * @param {*} moduleName
 * @returns {*} describe return value
 */
export const clearModuleQueries = (moduleName: string): void => {
  return queryClient.removeQueries({
    predicate: query => {
      const queryKey = query.queryKey[0]
      return typeof queryKey === 'string' && queryKey.startsWith(moduleName)
    },
  })
}
