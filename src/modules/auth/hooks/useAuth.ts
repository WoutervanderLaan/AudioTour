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
   * Authenticates a user with the provided credentials and updates the auth store with the response.
   *
   * @param credentials - The user's login credentials (email and password)
   * @returns Promise resolving to the login response containing user data and tokens
   */
  const login = async (
    credentials: LoginCredentials,
  ): Promise<LoginResponse> => {
    const response = await loginMutation.mutateAsync(credentials)
    return response
  }

  /**
   * Registers a new user account with the provided registration data and updates the auth store.
   *
   * @param data - The user's registration information (email, password, name, etc.)
   * @returns Promise resolving to the login response containing user data and tokens
   */
  const register = async (data: RegisterData): Promise<LoginResponse> => {
    const response = await registerMutation.mutateAsync(data)
    return response
  }

  /**
   * Logs out the current user by invalidating tokens on the server and clearing local auth state.
   * Handles logout failures gracefully by logging errors.
   *
   * @returns Promise that resolves when logout is complete
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
