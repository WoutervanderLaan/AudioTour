export enum AuthRouteName {
  login = 'Login',
  register = 'Register',
}

/**
 * ContactStackParams
 * TODO: describe what this type represents.
 */
export type AuthStackParams = {
  /**
   * property
   */
  [AuthRouteName.login]: undefined
  /**
   * property
   */
  [AuthRouteName.register]: undefined
}

export enum AuthModalName {}

/**
 * ContactModalParams
 * TODO: describe what this type represents.
 */
export type AuthModalParams = Record<string, never>
