import {
  useQuery,
  UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'

import {useAuthStore} from '../store/useAuthStore'
import {authKeys} from './keys'

import {apiClient} from '@/core/api/client'
import {type SessionResponse, User} from '@/modules/auth/types'

/**
 * React Query hook to fetch the current user session.
 *
 * Retrieves the current authentication session, including user data and
 * authentication status. Stale time is set to 5 minutes.
 *
 * @param options - Optional TanStack Query options (enabled, refetchInterval, etc.)
 * @returns Query result with session data and status
 *
 * @example
 * ```tsx
 * const { data: session, isLoading } = useSessionQuery()
 *
 * if (isLoading) return <Text>Loading...</Text>
 * return <Text>Welcome, {session?.user.name}</Text>
 * ```
 */
export const useSessionQuery = (
  options?: Omit<UseQueryOptions<SessionResponse>, 'queryKey' | 'queryFn'>,
): UseQueryResult<SessionResponse, Error> => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  return useQuery({
    queryKey: authKeys.session(),
    queryFn: async () => {
      const response = await apiClient.get<SessionResponse>('/auth/session')
      return response.data
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
    retry: false,
    ...options,
  })
}

/**
 * React Query hook to fetch the current user's profile.
 *
 * Retrieves detailed profile information for the authenticated user.
 *
 * @param options - Optional TanStack Query options (enabled, refetchInterval, etc.)
 * @returns Query result with user profile data and status
 *
 * @example
 * ```tsx
 * const { data: profile, isLoading, error } = useProfileQuery()
 *
 * if (error) return <Text>Error loading profile</Text>
 * if (isLoading) return <Text>Loading profile...</Text>
 * return <Text>{profile?.email}</Text>
 * ```
 */
export const useProfileQuery = (
  options?: Omit<UseQueryOptions<User>, 'queryKey' | 'queryFn'>,
): UseQueryResult<User, Error> => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: async () => {
      const response = await apiClient.get<User>('/auth/profile')
      return response.data
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  })
}

/**
 * Verify token validity
 */
export const useVerifyTokenQuery = (
  options?: Omit<UseQueryOptions<boolean>, 'queryKey' | 'queryFn'>,
): UseQueryResult<boolean, Error> => {
  const tokens = useAuthStore(state => state.tokens)

  return useQuery({
    queryKey: authKeys.verify(),
    queryFn: async () => {
      try {
        await apiClient.get('/auth/verify')
        return true
      } catch {
        return false
      }
    },
    enabled: !!tokens?.accessToken,
    staleTime: 1000 * 60, // 1 minute
    retry: false,
    ...options,
  })
}
