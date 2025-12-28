import {ModuleSlug} from '../slugs'
import type {ModuleConfig} from '../types'
import {communityStacks, communityTabs} from './screenConfig'

import {logger} from '@/core/lib/logger/logger'
import {TIME} from '@/shared/types/Time'

/**
 * Community module configuration.
 * Provides access to community and pre-made audio tours.
 * Includes:
 * - Tab screen: ExploreTab (main community browse)
 * - Stack screens: CommunityBrowse, CommunityDetail
 * - Search, filtering, and recommendations
 */
export const communityModule: ModuleConfig = {
  name: ModuleSlug.community,
  version: '1.0.0',
  enabled: true,

  stacks: communityStacks,
  modals: {},
  tabs: communityTabs,

  dependencies: [],

  onRegister: () => {
    logger.debug('Community Module registered')
  },

  onUnregister: () => {
    logger.debug('Community Module unregistered')
  },

  onAppStart: () => {
    logger.debug('[Community Module] Initializing...')
  },

  queries: {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: TIME.TEN_MINUTES,
  },
}
