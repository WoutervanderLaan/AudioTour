import type {
  AuthTokens,
  LoginCredentials,
  LoginResponse,
  RegisterData,
  SessionResponse,
  User,
} from '../types'

/**
 * UseAuthReturn
 * Return type for the useAuth hook containing authentication state, user data,
 * auth methods (login, logout, register), and their loading/error states.
 */
export type UseAuthReturn = {
  /**
   * user
   */
  user: User | null
  /**
   * tokens
   */
  tokens: AuthTokens | null
  /**
   * isAuthenticated
   */
  isAuthenticated: boolean
  /**
   * isInitialized
   */
  isInitialized: boolean
  /**
   * session
   */
  session: SessionResponse | undefined
  /**
   * isLoading
   */
  isLoading: boolean
  /**
   * isLoggingIn
   */
  isLoggingIn: boolean
  /**
   * isLoggingOut
   */
  isLoggingOut: boolean
  /**
   * isRegistering
   */
  isRegistering: boolean
  /**
   * login
   */
  login: (credentials: LoginCredentials) => Promise<LoginResponse>
  /**
   * logout
   */
  logout: () => Promise<void>
  /**
   * register
   */
  register: (data: RegisterData) => Promise<LoginResponse>
  /**
   * loginError
   */
  loginError: Error | null
  /**
   * logoutError
   */
  logoutError: Error | null
  /**
   * registerError
   */
  registerError: Error | null
}
