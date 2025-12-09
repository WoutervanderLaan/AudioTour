import {ModuleSlug} from '../slugs'
import type {ModuleConfig} from '../types'
import {authModals, authStacks, authTabs} from './screenConfig'

import {logger} from '@/core/lib/logger'
import {useAuthStore} from '@/modules/auth/store/useAuthStore'

/**
 * Authentication module configuration.
 * Handles user authentication flows and manages auth tokens.
 * Includes:
 * - Tab screens: Socials
 * - Stack screens: Login, Register
 */
export const authModule: ModuleConfig = {
  name: ModuleSlug.auth,
  version: '1.0.0',
  enabled: true,

  stacks: authStacks,
  modals: authModals,
  tabs: authTabs,

  dependencies: [ModuleSlug.old],

  onRegister: () => {
    logger.debug('Auth Module registered')
  },

  onUnregister: () => {
    logger.debug('Auth Module unregistered')
    useAuthStore.getState().reset()
  },

  onAppStart: () => {
    logger.debug('[Auth Module] Initializing...')

    // Initialize auth state and restore tokens to API client
    useAuthStore.getState().initialize()

    const {tokens, isAuthenticated} = useAuthStore.getState()

    if (isAuthenticated && tokens) {
      logger.debug('[Auth Module] Restored authenticated session')
    } else {
      logger.debug('[Auth Module] No authenticated session')
    }
  },

  queries: {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, //TODO: enum
  },
}
