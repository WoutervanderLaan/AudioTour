export enum AuthRouteName {
  login = 'Login',
  register = 'Register',
}

/**
 * AuthStackParams - Parameters for authentication stack screens
 */
export type AuthStackParams = {
  /**
   * Login screen params
   */
  [AuthRouteName.login]: undefined
  /**
   * Register screen params
   */
  [AuthRouteName.register]: undefined
}

/**
 * AuthTabParams - Parameters for authentication tab screens
 */
export type AuthTabParams = Record<string, never>

export enum AuthModalName {}

/**
 * AuthModalParams
 * Type mapping for authentication modal names to their parameter shapes.
 * Currently empty as no modals are defined.
 */
export type AuthModalParams = Record<string, never>
