import {
  useMutation,
  UseMutationOptions,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'

import {authKeys} from './keys'

import {apiClient} from '@/core/api/client'
import {logger} from '@/core/lib/logger/logger'
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
  const {setAuth} = useAuthStore()

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiClient.post<LoginResponse>(
        '/auth/login',
        credentials,
        {skipAuthRefresh: true},
      )
      return response.data
    },
    onSuccess: data => {
      setAuth(data.user, data.tokens)
      queryClient.invalidateQueries({queryKey: authKeys.session()})
      logger.success(`User logged in: ${data.user.email}`)
    },
    onError: error => {
      logger.error('[Auth] Login failed:', error)
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
      // Call logout endpoint to invalidate the refresh token on the server.
      // Errors are surfaced as the mutation's error; local logout is still
      // guaranteed by onSettled below (runs on both success and failure).
      await apiClient.post('/auth/logout', undefined, {
        skipAuthRefresh: true,
      })
    },
    onError: error => {
      logger.error('[Auth] Logout API call failed:', error)
    },
    onSettled: () => {
      // Always clear local auth state, even if the server call failed.
      logout()
      queryClient.clear()
      logger.success('User logged out')
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
  const {setAuth} = useAuthStore()

  return useMutation({
    mutationFn: async data => {
      const response = await apiClient.post<LoginResponse>(
        '/auth/register',
        data,
        {skipAuthRefresh: true},
      )
      return response.data
    },
    onSuccess: data => {
      setAuth(data.user, data.tokens)
      queryClient.invalidateQueries({queryKey: authKeys.session()})
      logger.success(`User registered: ${data.user.email}`)
    },
    onError: error => {
      logger.error('[Auth] Registration failed:', error)
    },
    ...options,
  })
}
