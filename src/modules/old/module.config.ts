import {Tabs} from './navigation/OldNavigator'
import {tabs} from './navigation/routes'

import {ModuleConfig} from '@/shared/types/module'

export const oldModuleConfig: ModuleConfig = {
  name: 'old',
  version: '1.0.0',
  enabled: true,

  navigator: Tabs,
  routes: tabs,

  dependencies: [],

  onRegister: () => {
    console.log('[Old Module] Registered')
  },

  onUnregister: () => {
    console.log('[Old Module] Unregistered')
  },

  onAppStart: () => {
    return
  },

  queries: {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  },
}
