import {ProfileScreen} from './screens/ProfileScreen'

import {
  StackNavigationRoutes,
  TabNavigationRoutes,
} from '@/core/navigation/types'
import {
  ProfileModalParams,
  ProfileRouteName,
  type ProfileStackParams,
  type ProfileTabParams,
} from '@/modules/profile/routes.types'

export const profileStacks: StackNavigationRoutes<
  ProfileStackParams,
  ProfileRouteName
> = {
  [ProfileRouteName.profile]: {
    component: ProfileScreen,
    name: ProfileRouteName.profile,
    options: {
      headerShown: true,
      headerTitle: 'Profile',
    },
  },
}

export const profileTabs: TabNavigationRoutes<ProfileTabParams> = {}

export const profileModals: StackNavigationRoutes<ProfileModalParams> = {}
