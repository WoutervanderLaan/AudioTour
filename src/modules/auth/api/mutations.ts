import {
  useMutation,
  UseMutationOptions,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'

import {authKeys} from './keys'

import {apiClient} from '@/core/api/client'
import {useAuthStore} from '@/modules/auth/store/useAuthStore'
import type {LoginCredentials, LoginResponse} from '@/modules/auth/types'

/**
 * React Query mutation hook for user login.
 *
 * Authenticates a user with email and password, updates the auth store with
 * user data and token, and invalidates the session query.
 *
 * @param options - Optional TanStack Query mutation options (onSuccess, onError, etc.)
 * @returns Mutation result with mutate function and status
 *
 * @example
 * ```tsx
 * const loginMutation = useLoginMutation()
 *
 * const handleLogin = () => {
 *   loginMutation.mutate({ email: 'user@example.com', password: 'password' })
 * }
 * ```
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
 * React Query mutation hook for user logout.
 *
 * Logs out the current user, clears the auth store, removes the auth token
 * from the API client, and clears all auth-related queries.
 *
 * @param options - Optional TanStack Query mutation options (onSuccess, onError, etc.)
 * @returns Mutation result with mutate function and status
 *
 * @example
 * ```tsx
 * const logoutMutation = useLogoutMutation()
 *
 * const handleLogout = () => {
 *   logoutMutation.mutate()
 * }
 * ```
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
 * React Query mutation hook for user registration.
 *
 * Registers a new user with name, email, and password. On success, updates the
 * auth store with user data and token, and invalidates the session query.
 *
 * @param options - Optional TanStack Query mutation options (onSuccess, onError, etc.)
 * @returns Mutation result with mutate function and status
 *
 * @example
 * ```tsx
 * const registerMutation = useRegisterMutation()
 *
 * const handleRegister = () => {
 *   registerMutation.mutate({
 *     name: 'John Doe',
 *     email: 'john@example.com',
 *     password: 'securepassword'
 *   })
 * }
 * ```
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
