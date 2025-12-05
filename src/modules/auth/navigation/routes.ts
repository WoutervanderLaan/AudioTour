import type {ModuleRoute} from '@/core/navigation/types'
import {LoginScreen} from '@/modules/auth/screens/LoginScreen'
import {RegisterScreen} from '@/modules/auth/screens/RegisterScreen'

export const routes: ModuleRoute[] = [
  {
    name: 'Login',
    screen: LoginScreen,
    linking: {
      path: 'login',
    },
  },
  {
    name: 'Register',
    screen: RegisterScreen,
    linking: {
      path: 'register',
    },
  },
]
