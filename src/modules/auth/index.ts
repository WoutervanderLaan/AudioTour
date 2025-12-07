import {ModuleSlug} from '../slugs'
import type {ModuleConfig} from '../types'
import {AuthStack} from './Stack'

import {apiClient} from '@/core/api/client'
import {logger} from '@/core/lib/logger'
import {useAuthStore} from '@/modules/auth/store/useAuthStore'

/**
 * Authentication module configuration.
 * Handles user authentication flows (login, register) and manages auth tokens.
 */
export const authModule: ModuleConfig = {
  name: ModuleSlug.auth,
  version: '1.0.0',
  enabled: true,

  navigator: AuthStack,

  dependencies: [ModuleSlug.old],

  onRegister: () => {
    logger.debug('Auth Module registered')
  },

  onUnregister: () => {
    logger.debug('Auth Module unregistered')
    // Clear store
    useAuthStore.getState().reset()
    apiClient.setAuthToken(null)
  },

  onAppStart: () => {
    // Restore token to API client if it exists
    const token = useAuthStore.getState().token
    if (token) {
      apiClient.setAuthToken(token)
      logger.debug('Auth token restored from store')
    }
  },

  queries: {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, //TODO: enum
  },
}
