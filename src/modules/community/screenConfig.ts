import {CommunityDetailScreen} from './screens/CommunityDetailScreen'
import {CommunityScreen} from './screens/CommunityScreen'

import {
  type StackNavigationRoutes,
  type TabNavigationRoutes,
} from '@/core/navigation/types'
import {
  CommunityRouteName,
  type CommunityStackParams,
  CommunityTabName,
  type CommunityTabParams,
} from '@/modules/community/routes.types'

/**
 * Community stack screen configurations.
 * Defines the stack navigator screens for the community module.
 */
export const communityStacks: StackNavigationRoutes<
  CommunityStackParams,
  CommunityRouteName
> = {
  [CommunityRouteName.browse]: {
    component: CommunityScreen,
    name: CommunityRouteName.browse,
    options: {
      headerShown: true,
      headerTitle: 'Explore',
    },
  },
  [CommunityRouteName.detail]: {
    component: CommunityDetailScreen,
    name: CommunityRouteName.detail,
    options: {
      headerShown: true,
      headerTitle: 'Tour Details',
    },
  },
}

/**
 * Community tab screen configurations.
 * Defines the bottom tab navigator screen for the community module.
 */
export const communityTabs: TabNavigationRoutes<
  CommunityTabParams,
  CommunityTabName
> = {
  [CommunityTabName.explore]: {
    component: CommunityScreen,
    name: CommunityTabName.explore,
    icon: 'explore',
    options: {
      headerShown: true,
      headerTitle: 'Explore',
    },
  },
}
