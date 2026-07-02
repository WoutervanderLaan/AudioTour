import {HomeScreen} from './screens/HomeScreen'

import {TabNavigationRoutes} from '@/core/navigation/types'
import {HomeTabName, type HomeTabParams} from '@/modules/home/routes.types'

/**
 * Home module tab screen configurations.
 * Registers the default landing tab shown when the app starts.
 */
export const homeTabs: TabNavigationRoutes<HomeTabParams, HomeTabName> = {
  [HomeTabName.home]: {
    component: HomeScreen,
    name: HomeTabName.home,
    icon: 'home',
    options: {
      headerShown: true,
      headerTitle: 'Home',
      title: 'Home',
    },
  },
}
