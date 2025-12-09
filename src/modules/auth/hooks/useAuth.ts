import {logger} from '@/core/lib/logger'
import {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} from '@/modules/auth/api/mutations'
import {useSessionQuery} from '@/modules/auth/api/queries'
import {useAuthStore} from '@/modules/auth/store/useAuthStore'
import type {
  AuthTokens,
  LoginCredentials,
  LoginResponse,
  RegisterData,
  SessionResponse,
  User,
} from '@/modules/auth/types'

/**
 * Main auth hook that combines store and queries
 */
export const useAuth = (): {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isInitialized: boolean
  session: SessionResponse | undefined
  isLoading: boolean
  isLoggingIn: boolean
  isLoggingOut: boolean
  isRegistering: boolean
  login: (credentials: LoginCredentials) => Promise<LoginResponse>
  logout: () => Promise<void>
  register: (data: RegisterData) => Promise<LoginResponse>
  loginError: Error | null
  logoutError: Error | null
  registerError: Error | null
} => {
  const {user, tokens, isAuthenticated, isInitialized} = useAuthStore()

  const {data: session, isLoading: isLoadingSession} = useSessionQuery({
    enabled: isAuthenticated,
  })

  const loginMutation = useLoginMutation()
  const logoutMutation = useLogoutMutation()
  const registerMutation = useRegisterMutation()

  /**
   * login
   * TODO: describe what it does.
   *
   * @param {*} credentials
   * @returns {*} describe return value
   */
  const login = async (
    credentials: LoginCredentials,
  ): Promise<LoginResponse> => {
    const response = await loginMutation.mutateAsync(credentials)
    return response
  }

  /**
   * register
   * TODO: describe what it does.
   *
   * @param {*} data
   * @returns {*} describe return value
   */
  const register = async (data: RegisterData): Promise<LoginResponse> => {
    const response = await registerMutation.mutateAsync(data)
    return response
  }

  /**
   * logout
   * TODO: describe what it does.
   *
   * @returns {*} describe return value
   */
  const logout = async (): Promise<void> => {
    try {
      await logoutMutation.mutateAsync()
    } catch (error) {
      logger.error('[Auth] Logout failed:', error)
      // TODO: Force logout locally even if server call fails
    }
  }

  return {
    // State
    user,
    tokens,
    isAuthenticated,
    isInitialized,
    session,

    // Loading states
    isLoading: isLoadingSession,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isRegistering: registerMutation.isPending,

    // Actions
    login,
    logout,
    register,

    // Errors
    loginError: loginMutation.error,
    logoutError: logoutMutation.error,
    registerError: registerMutation.error,
  }
}
