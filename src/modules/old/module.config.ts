import {Tabs} from './navigation/OldNavigator'
import {stackScreens} from './navigation/routes'

import {logger} from '@/core/lib/logger'
import {ModuleConfig} from '@/shared/types/module'

/**
 * Old module configuration - contains the legacy app screens.
 * This module includes the main tab navigation (Capture, Museum, Recommendations)
 * and modal/detail screens (ObjectDetail, Narrative, Settings, NotFound).
 *
 * TODO: Migrate screens to proper feature modules and remove this legacy module.
 */
export const oldModuleConfig: ModuleConfig = {
  name: 'old',
  version: '1.0.0',
  enabled: true,

  navigator: Tabs,
  routes: stackScreens, // Only stack screens are registered as routes in root navigator

  dependencies: [],

  onRegister: () => {
    logger.debug('Old Module registered')
  },

  onUnregister: () => {
    logger.debug('Old Module unregistered')
  },

  onAppStart: () => {
    return
  },

  queries: {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  },
}
