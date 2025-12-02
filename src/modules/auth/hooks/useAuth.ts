import type {UseMutateAsyncFunction} from '@tanstack/react-query'

import {useLoginMutation, useLogoutMutation} from '@/modules/auth/api/mutations'
import {useSessionQuery} from '@/modules/auth/api/queries'
import {useAuthStore} from '@/modules/auth/store/useAuthStore'
import type {
  LoginCredentials,
  LoginResponse,
  SessionResponse,
  User,
} from '@/modules/auth/types'

/**
 * Main auth hook that combines store and queries
 */
export const useAuth = (): {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  session: SessionResponse | undefined
  isLoading: boolean
  isLoggingIn: boolean
  isLoggingOut: boolean
  login: UseMutateAsyncFunction<LoginResponse, Error, LoginCredentials, unknown>
  logout: UseMutateAsyncFunction<void, Error, void, unknown>
  loginError: Error | null
  logoutError: Error | null
} => {
  const {user, token, isAuthenticated} = useAuthStore()
  const {data: session, isLoading: isLoadingSession} = useSessionQuery({
    enabled: isAuthenticated,
  })

  const loginMutation = useLoginMutation()
  const logoutMutation = useLogoutMutation()

  return {
    // State
    user,
    token,
    isAuthenticated,
    session,

    // Loading states
    isLoading: isLoadingSession,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,

    // Actions
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,

    // Errors
    loginError: loginMutation.error,
    logoutError: logoutMutation.error,
  }
}
