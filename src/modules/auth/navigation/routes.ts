import {LoginScreen} from '@/modules/auth/screens/LoginScreen'
import {RegisterScreen} from '@/modules/auth/screens/RegisterScreen'
import {ModuleRoute} from '@/shared/types/module'

/**
 * Tab routes for auth module.
 * Auth module does not provide tab routes.
 */
export const tabRoutes = [] as const satisfies readonly ModuleRoute[]

/**
 * Stack routes for auth module.
 * All auth routes are stack screens that appear in the root navigator.
 */
export const stackRoutes = [
  {
    name: 'Login',
    type: 'stack' as const,
    params: undefined,
    screen: LoginScreen,
    linking: {
      path: 'login',
    },
  },
  {
    name: 'Register',
    type: 'stack' as const,
    params: undefined,
    screen: RegisterScreen,
    linking: {
      path: 'register',
    },
  },
] as const satisfies readonly ModuleRoute[]

/**
 * Modal routes for auth module.
 * Auth module does not provide modal routes.
 */
export const modalRoutes = [] as const satisfies readonly ModuleRoute[]

/**
 * All routes from the auth module combined.
 * Exported for module config registration.
 */
export const routes = [...tabRoutes, ...stackRoutes, ...modalRoutes] as const
