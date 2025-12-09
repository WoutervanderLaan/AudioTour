/**
 * User
 * Represents an authenticated user with basic profile information.
 */
export type User = {
  /**
   * id
   */
  id: string
  /**
   * email
   */
  email: string
  /**
   * name
   */
  name: string
}

/**
 * AuthTokens
 * TODO: describe what this type represents.
 */
export type AuthTokens = {
  /**
   * accessToken
   */
  accessToken: string
  /**
   * refreshToken
   */
  refreshToken: string
  /**
   * accessTokenExpiresAt
   */
  accessTokenExpiresAt?: string
  /**
   * refreshTokenExpiresAt
   */
  refreshTokenExpiresAt?: string
}

/**
 * AuthState
 * Zustand store state for managing user authentication including user data, token, and auth actions.
 */
export type AuthState = {
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
   * setUser
   */
  setUser: (user: User) => void
  /**
   * setAuth
   */
  setAuth: (user: User, tokens: AuthTokens) => void
  /**
   * updateTokens
   */
  updateTokens: (tokens: AuthTokens) => void
  /**
   * logout
   */
  logout: () => void
  /**
   * reset
   */
  reset: () => void
  /**
   * initialize
   */
  initialize: () => void
}

/**
 * SessionResponse
 * API response containing the current user session information and expiration timestamp.
 */
export type SessionResponse = {
  /**
   * user
   */
  user: User
  /**
   * expiresAt
   */
  expiresAt: string
}

/**
 * LoginCredentials
 * User credentials required for authentication via email and password.
 */
export type LoginCredentials = {
  /**
   * email
   */
  email: string
  /**
   * password
   */
  password: string
}

/**
 * RegisterData
 * TODO: describe what this type represents.
 */
export type RegisterData = {
  /**
   * email
   */
  email: string
  /**
   * password
   */
  password: string
  /**
   * name
   */
  name: string
}

/**
 * LoginResponse
 * API response containing the authenticated user and their access token after successful login.
 */
export type LoginResponse = {
  /**
   * user
   */
  user: User
  /**
   * tokens
   */
  tokens: AuthTokens
}

/**
 * RefreshTokenResponse
 * TODO: describe what this type represents.
 */
export type RefreshTokenResponse = {
  /**
   * accessToken
   */
  accessToken: string
  /**
   * refreshToken
   */
  refreshToken?: string
  /**
   * accessTokenExpiresAt
   */
  accessTokenExpiresAt?: string
}
