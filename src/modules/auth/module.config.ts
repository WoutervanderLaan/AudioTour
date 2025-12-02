import {AuthNavigator} from './navigation/AuthNavigator'
import {routes} from './navigation/routes'

import {useAuthStore} from '@/modules/auth/store/useAuthStore'
import {apiClient} from '@/shared/api/client'
import {ModuleConfig} from '@/shared/types/module'

export const authModuleConfig: ModuleConfig = {
  name: 'auth',
  version: '1.0.0',
  enabled: true,

  navigator: AuthNavigator,
  routes,

  dependencies: [],

  onRegister: () => {
    console.log('[Auth Module] Registered')
  },

  onUnregister: () => {
    console.log('[Auth Module] Unregistered')
    // Clear store
    useAuthStore.getState().reset()
    apiClient.setAuthToken(null)
  },

  onAppStart: () => {
    // Restore token to API client if it exists
    const token = useAuthStore.getState().token
    if (token) {
      apiClient.setAuthToken(token)
    }
  },

  queries: {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  },
}
