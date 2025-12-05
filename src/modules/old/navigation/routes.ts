import type {ModuleRoute} from '@/core/navigation/types'
import {Capture} from '@/modules/old/screens/Capture'
import {Museum} from '@/modules/old/screens/Museum'
import {Narrative} from '@/modules/old/screens/Narrative'
import {NotFound} from '@/modules/old/screens/NotFound'
import {Recommendations} from '@/modules/old/screens/Recommendations'
import {Settings} from '@/modules/old/screens/Settings'

/**
 * Tab routes that appear in the bottom tab navigator (main navigation)
 */
export const tabs: ModuleRoute[] = [
  {
    name: 'Capture',
    screen: Capture,
    options: {
      title: 'Capture',
    },
  },
  {
    name: 'Museum',
    screen: Museum,
    options: {
      title: 'Museum',
    },
  },
  {
    name: 'Recommendations',
    screen: Recommendations,
    options: {
      title: 'Recommendations',
    },
  },
]

/**
 * Modal and detail screens that appear in the root stack navigator
 */
export const stackScreens: ModuleRoute[] = [
  // {
  //   name: 'ObjectDetail',
  //   screen: ObjectDetail,
  //   options: {
  //     title: 'Object Detail',
  //   },
  //   linking: {
  //     path: 'object/:id',
  //   },
  // },
  {
    name: 'Narrative',
    screen: Narrative,
    options: {
      title: 'Narrative',
    },
    linking: {
      path: 'narrative/:id',
    },
  },
  {
    name: 'Settings',
    screen: Settings,
    options: {
      title: 'Settings',
      presentation: 'modal',
    },
    linking: {
      path: 'settings',
    },
  },
  {
    name: 'NotFound',
    screen: NotFound,
    options: {
      title: '404',
    },
    linking: {
      path: '*',
    },
  },
]
