export enum AuthRouteName {
  login = 'Login',
  register = 'Register',
}

/**
 * AuthStackParams
 * Type mapping for authentication stack route names to their parameter shapes.
 * Routes with undefined params don't accept any parameters.
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
 * AuthModalParams
 * Type mapping for authentication modal names to their parameter shapes.
 * Currently empty as no modals are defined.
 */
export type AuthModalParams = Record<string, never>
