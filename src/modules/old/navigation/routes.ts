import {Capture} from '@/modules/old/screens/Capture'
import {Museum} from '@/modules/old/screens/Museum'
import {Narrative} from '@/modules/old/screens/Narrative'
import {NotFound} from '@/modules/old/screens/NotFound'
import {Recommendations} from '@/modules/old/screens/Recommendations'
import {Settings} from '@/modules/old/screens/Settings'
import {ModuleRoute} from '@/shared/types/module'

/**
 * All routes from the old module.
 * Includes tab routes (bottom tab navigator) and stack/modal routes (root stack navigator).
 */
export const routes = [
  // Tab routes - appear in bottom tab navigator
  {
    name: 'Capture',
    type: 'tab',
    params: undefined,
    screen: Capture,
    options: {
      title: 'Capture',
    },
  },
  {
    name: 'Museum',
    type: 'tab',
    params: undefined,
    screen: Museum,
    options: {
      title: 'Museum',
    },
  },
  {
    name: 'Recommendations',
    type: 'tab',
    params: undefined,
    screen: Recommendations,
    options: {
      title: 'Recommendations',
    },
  },

  // Stack routes - appear in root stack navigator
  {
    name: 'Narrative',
    type: 'stack',
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
    type: 'stack',
    params: undefined,
    screen: NotFound,
    options: {
      title: '404',
    },
    linking: {
      path: '*',
    },
  },

  // Modal routes - appear as modals in root stack navigator
  {
    name: 'Settings',
    type: 'modal',
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
