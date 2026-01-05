import {ModuleSlug} from '../slugs'
import type {ModuleConfig} from '../types'
import {historyStacks, historyTabs} from './screenConfig'

import {logger} from '@/core/lib/logger/logger'
import {TIME} from '@/shared/types/Time'

/**
 * History module configuration.
 * Provides access to the user's saved audio tour history.
 * Includes:
 * - Tab screen: HistoryTab (main history list)
 * - Stack screens: HistoryList, HistoryDetail
 * - Integrates with the history store for tour persistence
 */
export const historyModule: ModuleConfig = {
  name: ModuleSlug.history,
  version: '1.0.0',
  enabled: true,

  stacks: historyStacks,
  modals: {},
  tabs: historyTabs,

  dependencies: [],

  onRegister: () => {
    logger.debug('History Module registered')
  },

  onUnregister: () => {
    logger.debug('History Module unregistered')
  },

  onAppStart: () => {
    logger.debug('[History Module] Initializing...')
  },

  queries: {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: TIME.FIVE_MINUTES,
  },
}
