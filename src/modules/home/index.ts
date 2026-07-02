import {ModuleSlug} from '../slugs'
import type {ModuleConfig} from '../types'
import {homeTabs} from './screenConfig'

import {logger} from '@/core/lib/logger/logger'
import {TIMING} from '@/shared/constants/timing'

/**
 * Home module configuration.
 * Provides the default landing tab for the application. Acts as a starting
 * point that new projects can build on or replace.
 * Includes:
 * - Tab screens: Home
 */
export const homeModule: ModuleConfig = {
  name: ModuleSlug.home,
  version: '1.0.0',
  enabled: true,

  tabs: homeTabs,

  dependencies: [],

  onRegister: () => {
    logger.debug('Home Module registered')
  },

  onUnregister: () => {
    logger.debug('Home Module unregistered')
  },

  onAppStart: () => {
    logger.debug('[Home Module] Initializing...')
  },

  queries: {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: TIMING.QUERY_STALE_TIME,
  },
}
