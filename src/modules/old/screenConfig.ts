import {
  OldModalName,
  OldModalParams,
  OldRouteName,
  OldStackParams,
} from './routes'
import {Capture} from './screens/Capture'
import {Museum} from './screens/Museum'
import {Narrative} from './screens/Narrative'
import {NotFound} from './screens/NotFound'
import {ObjectDetail} from './screens/ObjectDetail'
import {Recommendations} from './screens/Recommendations'
import {Settings} from './screens/Settings'

import {StackNavigationRoutes} from '@/core/navigation/types'

export const screenConfig: StackNavigationRoutes<OldStackParams, OldRouteName> =
  {
    [OldRouteName.capture]: {
      component: Capture,
      name: OldRouteName.capture,
      options: {
        headerShown: true,
        headerTitle: 'Capture',
      },
    },
    [OldRouteName.museum]: {
      component: Museum,
      name: OldRouteName.museum,
      options: {
        headerShown: false,
        headerTitle: 'Museum',
      },
    },
    [OldRouteName.recommendations]: {
      component: Recommendations,
      name: OldRouteName.recommendations,
      options: {
        headerShown: false,
        headerTitle: 'Recommendations',
      },
    },
    [OldRouteName.objectDetail]: {
      component: ObjectDetail,
      name: OldRouteName.objectDetail,
      options: {
        headerShown: false,
        headerTitle: 'Object Detail',
      },
    },
    [OldRouteName.narrative]: {
      component: Narrative,
      name: OldRouteName.narrative,
      options: {
        headerShown: false,
        headerTitle: 'Narrative',
      },
    },
    [OldRouteName.notFound]: {
      component: NotFound,
      name: OldRouteName.notFound,
      options: {
        headerShown: false,
        headerTitle: '404',
      },
    },
  }

export const oldModals: StackNavigationRoutes<OldModalParams, OldModalName> = {
  [OldModalName.settings]: {
    component: Settings,
    name: OldModalName.settings,
  },
}
