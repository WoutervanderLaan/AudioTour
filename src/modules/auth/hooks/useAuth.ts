import {logger} from '@/core/lib/logger/logger'
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
 * Main authentication hook that provides a unified interface for auth operations.
 *
 * This hook combines the auth store (Zustand) with authentication queries and
 * mutations (TanStack Query) to provide a complete authentication interface.
 * It exposes user state, authentication status, loading states, and action
 * functions for login, logout, and registration.
 *
 * @returns Object containing auth state, loading states, actions, and errors
 * @returns user - The currently authenticated user or null
 * @returns tokens - The current authentication tokens or null
 * @returns isAuthenticated - Whether the user is currently authenticated
 * @returns isInitialized - Whether the auth state has been initialized
 * @returns session - The current session data from the server
 * @returns isLoading - Whether the session query is loading
 * @returns isLoggingIn - Whether a login operation is in progress
 * @returns isLoggingOut - Whether a logout operation is in progress
 * @returns isRegistering - Whether a registration operation is in progress
 * @returns login - Function to authenticate with email and password
 * @returns logout - Function to log out the current user
 * @returns register - Function to register a new user account
 * @returns loginError - Error from the most recent login attempt
 * @returns logoutError - Error from the most recent logout attempt
 * @returns registerError - Error from the most recent registration attempt
 *
 * @example
 * ```tsx
 * const {
 *   user,
 *   isAuthenticated,
 *   isLoggingIn,
 *   login,
 *   logout,
 *   loginError
 * } = useAuth()
 *
 * const handleLogin = async () => {
 *   await login({ email: 'user@example.com', password: 'password123' })
 * }
 *
 * if (isLoggingIn) return <Text>Logging in...</Text>
 * if (loginError) return <Text>Error: {loginError.message}</Text>
 * if (isAuthenticated) return <Text>Welcome, {user?.name}</Text>
 * ```
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
