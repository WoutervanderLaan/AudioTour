import {
  useMutation,
  UseMutationOptions,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'

import {authKeys} from './keys'

import {useAuthStore} from '@/modules/auth/store/useAuthStore'
import type {LoginCredentials, LoginResponse} from '@/modules/auth/types'
import {apiClient} from '@/shared/api/client'

/**
 * Login mutation
 */
export const useLoginMutation = (
  options?: Omit<
    UseMutationOptions<LoginResponse, Error, LoginCredentials>,
    'mutationFn'
  >,
): UseMutationResult<LoginResponse, Error, LoginCredentials, unknown> => {
  const queryClient = useQueryClient()
  const {setUser, setToken} = useAuthStore()

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiClient.post<LoginResponse>(
        '/auth/login',
        credentials,
      )
      return response.data
    },
    onSuccess: data => {
      // Update Zustand store
      setUser(data.user)
      setToken(data.token)

      // Set token in API client
      apiClient.setAuthToken(data.token)

      // Invalidate and refetch queries
      queryClient.invalidateQueries({queryKey: authKeys.session()})
    },
    ...options,
  })
}

/**
 * Logout mutation
 */
export const useLogoutMutation = (
  options?: Omit<UseMutationOptions<void, Error, void>, 'mutationFn'>,
): UseMutationResult<void, Error, void, unknown> => {
  const queryClient = useQueryClient()
  const {logout} = useAuthStore()

  return useMutation({
    mutationFn: async () => {
      await apiClient.post('/auth/logout')
    },
    onSuccess: () => {
      // Clear Zustand store
      logout()

      // Remove token from API client
      apiClient.setAuthToken(null)

      // Clear all auth queries
      queryClient.removeQueries({queryKey: authKeys.all})
    },
    ...options,
  })
}

/**
 * Register mutation
 */
export const useRegisterMutation = (
  options?: Omit<
    UseMutationOptions<LoginResponse, Error, LoginCredentials & {name: string}>,
    'mutationFn'
  >,
): UseMutationResult<
  LoginResponse,
  Error,
  LoginCredentials & {
    name: string
  },
  unknown
> => {
  const queryClient = useQueryClient()
  const {setUser, setToken} = useAuthStore()

  return useMutation({
    mutationFn: async data => {
      const response = await apiClient.post<LoginResponse>(
        '/auth/register',
        data,
      )
      return response.data
    },
    onSuccess: data => {
      setUser(data.user)
      setToken(data.token)
      apiClient.setAuthToken(data.token)
      queryClient.invalidateQueries({queryKey: authKeys.session()})
    },
    ...options,
  })
}
