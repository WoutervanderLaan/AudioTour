import {
  OldModalName,
  OldModalParams,
  OldRouteName,
  OldStackParams,
  OldTabName,
  OldTabParams,
} from './routes.types'
import {Capture} from './screens/Capture'
import {Museum} from './screens/Museum'
import {Narrative} from './screens/Narrative'
import {NotFound} from './screens/NotFound'
import {ObjectDetail} from './screens/ObjectDetail'
import {Recommendations} from './screens/Recommendations'
import {Settings} from './screens/Settings'

import {
  StackNavigationRoutes,
  TabNavigationRoutes,
} from '@/core/navigation/types'

export const oldStacks: StackNavigationRoutes<OldStackParams, OldRouteName> = {
  [OldRouteName.objectDetail]: {
    component: ObjectDetail,
    name: OldRouteName.objectDetail,
    options: {
      headerShown: true,
      headerTitle: 'Object Detail',
    },
  },
  [OldRouteName.narrative]: {
    component: Narrative,
    name: OldRouteName.narrative,
    options: {
      headerShown: true,
      headerTitle: 'Narrative',
    },
  },
  [OldRouteName.notFound]: {
    component: NotFound,
    name: OldRouteName.notFound,
    options: {
      headerShown: true,
      headerTitle: '404',
    },
  },
}

export const oldTabs: TabNavigationRoutes<OldTabParams, OldTabName> = {
  [OldTabName.capture]: {
    component: Capture,
    name: OldTabName.capture,
    icon: 'camera',
    options: {
      headerShown: true,
      headerTitle: 'Capture',
    },
  },
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
