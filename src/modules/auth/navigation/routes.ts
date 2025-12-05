import {LoginScreen} from '@/modules/auth/screens/LoginScreen'
import {RegisterScreen} from '@/modules/auth/screens/RegisterScreen'
import {ModuleRoute} from '@/shared/types/module'

/**
 * Authentication module routes.
 * All auth routes are stack screens that appear in the root navigator.
 */
export const routes = [
  {
    name: 'Login',
    type: 'stack',
    params: undefined,
    screen: LoginScreen,
    linking: {
      path: 'login',
    },
  },
  {
    name: 'Register',
    type: 'stack',
    params: undefined,
    screen: RegisterScreen,
    linking: {
      path: 'register',
    },
  },
] as const satisfies readonly ModuleRoute[]
