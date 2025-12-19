import {LoginScreen} from './screens/LoginScreen'
import {RegisterScreen} from './screens/RegisterScreen'

import {
  StackNavigationRoutes,
  TabNavigationRoutes,
} from '@/core/navigation/types'
import {
  AuthModalParams,
  AuthRouteName,
  type AuthStackParams,
  type AuthTabParams,
} from '@/modules/auth/routes.types'

/**
 * Auth module stack screen configurations.
 * Defines navigation routes for authentication flows including login and register screens.
 */
export const authStacks: StackNavigationRoutes<AuthStackParams, AuthRouteName> =
  {
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
        headerShown: true,
        headerTitle: 'Register',
      },
    },
  }

/**
 * Auth module tab screen configurations.
 * Defines tab navigation routes for social features within the auth module.
 */
export const authTabs: TabNavigationRoutes<AuthTabParams> = {}

/**
 * Auth module modal screen configurations.
 * Currently empty - reserved for future modal dialogs in the auth module.
 */
export const authModals: StackNavigationRoutes<AuthModalParams> = {}
