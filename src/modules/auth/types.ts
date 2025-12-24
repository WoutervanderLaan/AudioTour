/**
 * User
 * Represents an authenticated user with basic profile information.
 */
export type User = {
  /**
   * Unique identifier for the user account
   */
  id: string
  /**
   * User's email address used for authentication
   */
  email: string
  /**
   * User's display name
   */
  name: string
}

/**
 * AuthTokens
 * JWT authentication tokens with their expiration timestamps for both access and refresh tokens.
 */
export type AuthTokens = {
  /**
   * JWT access token used to authenticate API requests
   */
  accessToken: string
  /**
   * JWT refresh token used to obtain new access tokens when they expire
   */
  refreshToken: string
  /**
   * ISO 8601 timestamp when the access token expires
   */
  accessTokenExpiresAt?: string
  /**
   * ISO 8601 timestamp when the refresh token expires
   */
  refreshTokenExpiresAt?: string
}

/**
 * AuthState
 * Zustand store state for managing user authentication including user data, token, and auth actions.
 */
export type AuthState = {
  /**
   * The currently authenticated user or null if not authenticated
   */
  user: User | null
  /**
   * JWT authentication tokens or null if not authenticated
   */
  tokens: AuthTokens | null
  /**
   * Whether the user is currently authenticated (has valid tokens)
   */
  isAuthenticated: boolean
  /**
   * Whether the auth store has completed initialization from persisted state
   */
  isInitialized: boolean
  /**
   * Updates the user data without changing authentication tokens
   */
  setUser: (user: User) => void
  /**
   * Sets both user and tokens, marking the user as authenticated
   */
  setAuth: (user: User, tokens: AuthTokens) => void
  /**
   * Updates only the authentication tokens (e.g., after token refresh)
   */
  updateTokens: (tokens: AuthTokens) => void
  /**
   * Clears user data and tokens, logging the user out
   */
  logout: () => void
  /**
   * Resets the auth store to its initial state
   */
  reset: () => void
  /**
   * Marks the store as initialized (called after loading persisted state)
   */
  initialize: () => void
}

/**
 * SessionResponse
 * API response containing the current user session information and expiration timestamp.
 */
export type SessionResponse = {
  /**
   * The authenticated user's profile information
   */
  user: User
  /**
   * ISO 8601 timestamp when the session expires
   */
  expiresAt: string
}

/**
 * LoginCredentials
 * User credentials required for authentication via email and password.
 */
export type LoginCredentials = {
  /**
   * User's email address for authentication
   */
  email: string
  /**
   * User's password
   */
  password: string
}

/**
 * RegisterData
 * User registration data required to create a new account including email, password, and name.
 */
export type RegisterData = {
  /**
   * Email address for the new account
   */
  email: string
  /**
   * Password for the new account
   */
  password: string
  /**
   * Display name for the new user
   */
  name: string
}

/**
 * LoginResponse
 * API response containing the authenticated user and their access token after successful login.
 */
export type LoginResponse = {
  /**
   * The authenticated user's profile information
   */
  user: User
  /**
   * JWT authentication tokens for the session
   */
  tokens: AuthTokens
}

/**
 * RefreshTokenResponse
 * API response containing new access and refresh tokens after successfully refreshing an expired access token.
 */
export type RefreshTokenResponse = {
  /**
   * New JWT access token
   */
  accessToken: string
  /**
   * Optional new refresh token (may not be provided if refresh token rotation is disabled)
   */
  refreshToken?: string
  /**
   * ISO 8601 timestamp when the new access token expires
   */
  accessTokenExpiresAt?: string
}
