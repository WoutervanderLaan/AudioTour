import {ModuleSlug} from '../slugs'
import type {ModuleConfig} from '../types'
import {profileModals, profileStacks, profileTabs} from './screenConfig'

import {logger} from '@/core/lib/logger/logger'

/**
 * Profile module configuration.
 * Handles user profile display and management.
 * Includes:
 * - Stack screens: Profile
 */
export const profileModule: ModuleConfig = {
  name: ModuleSlug.profile,
  version: '1.0.0',
  enabled: true,

  stacks: profileStacks,
  modals: profileModals,
  tabs: profileTabs,

  dependencies: [ModuleSlug.auth],

  onRegister: () => {
    logger.debug('Profile Module registered')
  },

  onUnregister: () => {
    logger.debug('Profile Module unregistered')
  },

  onAppStart: () => {
    logger.debug('[Profile Module] Initializing...')
  },
}
