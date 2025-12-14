import {
  OldModalName,
  OldModalParams,
  OldRouteName,
  OldStackParams,
  OldTabName,
  OldTabParams,
} from './routes.types'
import {Museum} from './screens/Museum'
import {NotFound} from './screens/NotFound'
import {Recommendations} from './screens/Recommendations'
import {Settings} from './screens/Settings'

import {
  StackNavigationRoutes,
  TabNavigationRoutes,
} from '@/core/navigation/types'

/**
 * Old module stack screens
 * NOTE: Capture, ObjectDetail, and Narrative screens have been replaced by the tour module
 * and are no longer registered here.
 */
export const oldStacks: StackNavigationRoutes<OldStackParams, OldRouteName> = {
  [OldRouteName.notFound]: {
    component: NotFound,
    name: OldRouteName.notFound,
    options: {
      headerShown: true,
      headerTitle: '404',
    },
  },
}

/**
 * Old module tab screens
 * NOTE: Capture tab has been replaced by the tour module's tour tab
 */
export const oldTabs: TabNavigationRoutes<OldTabParams, OldTabName> = {
  [OldTabName.museum]: {
    component: Museum,
    name: OldTabName.museum,
    icon: 'museum',
    options: {
      headerShown: true,
      headerTitle: 'Museum',
    },
  },
  [OldTabName.recommendations]: {
    component: Recommendations,
    name: OldTabName.recommendations,
    icon: 'recommend',
    options: {
      headerShown: true,
      headerTitle: 'Recommendations',
    },
  },
}

export const oldModals: StackNavigationRoutes<OldModalParams, OldModalName> = {
  [OldModalName.settings]: {
    component: Settings,
    name: OldModalName.settings,
  },
}
