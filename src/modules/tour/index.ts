import {ModuleSlug} from '../slugs'
import type {ModuleConfig} from '../types'
import {tourModals, tourStacks, tourTabs} from './screenConfig'

import {logger} from '@/core/lib/logger/logger'
import {TIME} from '@/shared/types/Time'

/**
 * Tour module configuration.
 * Handles the complete audio tour experience including photo capture,
 * object recognition, narrative generation, and audio playback.
 * Includes:
 * - Stack screens: TourHome, TourFeed, TourCamera, TourObjectDetail
 * - Modal screens: TourPhotoSubmit
 * - Tab screens: Tour
 */
export const tourModule: ModuleConfig = {
  name: ModuleSlug.tour,
  version: '1.0.0',
  enabled: true,

  stacks: tourStacks,
  modals: tourModals,
  tabs: tourTabs,

  dependencies: [],

  onRegister: () => {
    logger.debug('Tour Module registered')
  },

  onUnregister: () => {
    logger.debug('Tour Module unregistered')
  },

  onAppStart: () => {
    logger.debug('[Tour Module] Initializing...')
  },

  queries: {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: TIME.FIVE_MINUTES,
  },
}
