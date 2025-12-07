import {ModuleSlug} from '../slugs'
import type {ModuleConfig} from '../types'
import {oldModals} from './screenConfig'
import {OldStack} from './Stack'

import {logger} from '@/core/lib/logger'

/**
 * Old module configuration - contains the legacy app screens.
 * This module includes the main tab navigation (Capture, Museum, Recommendations)
 * and modal/detail screens (ObjectDetail, Narrative, Settings, NotFound).
 *
 * TODO: Migrate screens to proper feature modules and remove this legacy module.
 */
export const oldModule: ModuleConfig = {
  name: ModuleSlug.old,
  version: '1.0.0',
  enabled: true,

  navigator: OldStack,
  modals: oldModals,

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
    staleTime: 1000 * 60 * 5, //TODO: enum
  },
}
