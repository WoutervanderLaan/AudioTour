import {
  useQuery,
  UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'

import {authKeys} from './keys'

import {type SessionResponse, User} from '@/modules/auth/types'
import {apiClient} from '@/shared/api/client'

/**
 * Fetch current session
 */
export const useSessionQuery = (
  options?: Omit<UseQueryOptions<SessionResponse>, 'queryKey' | 'queryFn'>,
): UseQueryResult<SessionResponse, Error> => {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: async () => {
      const response = await apiClient.get<SessionResponse>('/auth/session')
      return response.data
    },
    staleTime: 1000 * 60 * 5,
    ...options,
  })
}

/**
 * Fetch user profile
 */
export const useProfileQuery = (
  options?: Omit<UseQueryOptions<User>, 'queryKey' | 'queryFn'>,
): UseQueryResult<User, Error> => {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: async () => {
      const response = await apiClient.get<User>('/auth/profile')
      return response.data
    },
    ...options,
  })
}
