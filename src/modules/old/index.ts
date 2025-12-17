import {ModuleSlug} from '../slugs'
import type {ModuleConfig} from '../types'
import {oldModals, oldStacks, oldTabs} from './screenConfig'

import {logger} from '@/core/lib/logger'
import {TIMING} from '@/shared/constants/timing'

/**
 * Old module configuration - contains the legacy app screens.
 * This module includes:
 * - Tab screens: Capture, Museum, Recommendations
 * - Stack screens: ObjectDetail, Narrative, NotFound
 * - Modal screens: Settings
 *
 * TODO: Migrate screens to proper feature modules and remove this legacy module.
 */
export const oldModule: ModuleConfig = {
  name: ModuleSlug.old,
  version: '1.0.0',
  enabled: true,

  stacks: oldStacks,
  modals: oldModals,
  tabs: oldTabs,

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
    staleTime: TIMING.QUERY_STALE_TIME,
  },
}
