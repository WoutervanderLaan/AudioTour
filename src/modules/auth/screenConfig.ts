import {LoginScreen} from './screens/LoginScreen'
import {RegisterScreen} from './screens/RegisterScreen'
import {SocialsScreen} from './screens/SocialsScreen'

import {
  StackNavigationRoutes,
  TabNavigationRoutes,
} from '@/core/navigation/types'
import {
  AuthModalParams,
  AuthRouteName,
  type AuthStackParams,
  AuthTabName,
  type AuthTabParams,
} from '@/modules/auth/routes.types'

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

export const authTabs: TabNavigationRoutes<AuthTabParams, AuthTabName> = {
  [AuthTabName.socials]: {
    component: SocialsScreen,
    name: AuthTabName.socials,
    icon: 'person',
    options: {
      headerShown: true,
      headerTitle: 'Socials',
    },
  },
}

export const authModals: StackNavigationRoutes<AuthModalParams> = {}
