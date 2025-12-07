import {
  useQuery,
  UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'

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
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: async () => {
      const response = await apiClient.get<User>('/auth/profile')
      return response.data
    },
    ...options,
  })
}
