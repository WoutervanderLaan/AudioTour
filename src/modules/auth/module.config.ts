import {AuthNavigator} from './navigation/AuthNavigator'
import {routes} from './navigation/routes'

import {apiClient} from '@/core/api/client'
import {logger} from '@/core/lib/logger'
import type {ModuleConfig} from '@/core/navigation/types'
import {useAuthStore} from '@/modules/auth/store/useAuthStore'

/**
 * Authentication module configuration.
 * Handles user authentication flows (login, register) and manages auth tokens.
 */
export const authModuleConfig: ModuleConfig = {
  name: 'auth',
  version: '1.0.0',
  enabled: true,

  navigator: AuthNavigator,
  routes,

  dependencies: [],

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
    staleTime: 1000 * 60 * 5,
  },
}
