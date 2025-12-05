import {routes} from './navigation/routes'

import {logger} from '@/core/lib/logger'
import {ModuleConfig} from '@/shared/types/module'

/**
 * Old module configuration - contains the legacy app screens.
 * This module includes the main tab navigation (Capture, Museum, Recommendations)
 * and modal/detail screens (Narrative, Settings, NotFound).
 *
 * Routes are now defined with type annotations (tab, stack, modal) and parameter types.
 * The ModuleRegistry dynamically gathers these routes to build the navigation structure.
 *
 * TODO: Migrate screens to proper feature modules and remove this legacy module.
 */
export const oldModuleConfig: ModuleConfig = {
  name: 'old',
  version: '1.0.0',
  enabled: true,

  routes, // All routes (tabs, stack, modals) are now in one array with type annotations

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
