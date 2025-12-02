/**
 * User
 * TODO: describe what this type represents.
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
 * TODO: describe what this type represents.
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
 * TODO: describe what this type represents.
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
 * TODO: describe what this type represents.
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
 * TODO: describe what this type represents.
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
