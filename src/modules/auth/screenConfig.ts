import {LoginScreen} from './screens/LoginScreen'
import {RegisterScreen} from './screens/RegisterScreen'

import {StackNavigationRoutes} from '@/core/navigation/types'
import {
  AuthModalParams,
  AuthRouteName,
  type AuthStackParams,
} from '@/modules/auth/routes'

export const screenConfig: StackNavigationRoutes<
  AuthStackParams,
  AuthRouteName
> = {
  [AuthRouteName.login]: {
    component: LoginScreen,
    name: AuthRouteName.login,
    options: {
      headerShown: true,
      headerTitle: 'Login',
    },
  },
  [AuthRouteName.register]: {
    component: RegisterScreen,
    name: AuthRouteName.register,
    options: {
      headerTitle: 'Register',
    },
  },
}

export const authModals: StackNavigationRoutes<AuthModalParams> = {}
