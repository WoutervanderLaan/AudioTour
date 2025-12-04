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
 * AuthState
 * Zustand store state for managing user authentication including user data, token, and auth actions.
 */
export type AuthState = {
  /**
   * user
   */
  user: User | null
  /**
   * token
   */
  token: string | null
  /**
   * isAuthenticated
   */
  isAuthenticated: boolean

  // Actions
  /**
   * setUser
   */
  setUser: (user: User) => void
  /**
   * setToken
   */
  setToken: (token: string) => void
  /**
   * logout
   */
  logout: () => void
  /**
   * reset
   */
  reset: () => void
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
 * LoginResponse
 * API response containing the authenticated user and their access token after successful login.
 */
export type LoginResponse = {
  /**
   * user
   */
  user: User
  /**
   * token
   */
  token: string
}
