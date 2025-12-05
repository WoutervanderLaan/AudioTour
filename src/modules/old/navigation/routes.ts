import {Capture} from '@/modules/old/screens/Capture'
import {Museum} from '@/modules/old/screens/Museum'
import {Narrative} from '@/modules/old/screens/Narrative'
import {NotFound} from '@/modules/old/screens/NotFound'
import {ObjectDetail} from '@/modules/old/screens/ObjectDetail'
import {Recommendations} from '@/modules/old/screens/Recommendations'
import {Settings} from '@/modules/old/screens/Settings'
import {ModuleRoute} from '@/shared/types/module'

/**
 * Tab routes - appear in bottom tab navigator
 */
export const tabRoutes = [
  {
    name: 'Capture',
    type: 'tab' as const,
    params: undefined,
    screen: Capture,
    options: {
      title: 'Capture',
    },
  },
  {
    name: 'Museum',
    type: 'tab' as const,
    params: undefined,
    screen: Museum,
    options: {
      title: 'Museum',
    },
  },
  {
    name: 'Recommendations',
    type: 'tab' as const,
    params: undefined,
    screen: Recommendations,
    options: {
      title: 'Recommendations',
    },
  },
] as const satisfies readonly ModuleRoute[]

/**
 * Stack routes - appear in root stack navigator
 */
export const stackRoutes = [
  {
    name: 'ObjectDetail',
    type: 'stack' as const,
    params: {id: '' as string},
    screen: ObjectDetail,
    options: {
      title: 'Object Detail',
    },
    linking: {
      path: 'object/:id',
    },
  },
  {
    name: 'Narrative',
    type: 'stack' as const,
    params: {id: '' as string},
    screen: Narrative,
    options: {
      title: 'Narrative',
    },
    linking: {
      path: 'narrative/:id',
    },
  },
  {
    name: 'NotFound',
    type: 'stack' as const,
    params: undefined,
    screen: NotFound,
    options: {
      title: '404',
    },
    linking: {
      path: '*',
    },
  },
] as const satisfies readonly ModuleRoute[]

/**
 * Modal routes - appear as modals in root stack navigator
 */
export const modalRoutes = [
  {
    name: 'Settings',
    type: 'modal' as const,
    params: undefined,
    screen: Settings,
    options: {
      title: 'Settings',
      presentation: 'modal',
    },
    linking: {
      path: 'settings',
    },
  },
] as const satisfies readonly ModuleRoute[]

/**
 * All routes from the old module combined.
 * Exported for module config registration.
 */
export const routes = [...tabRoutes, ...stackRoutes, ...modalRoutes] as const
