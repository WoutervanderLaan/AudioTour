import {authModule} from './auth'
import {notificationsModule} from './notifications'
import {oldModule} from './old'
import {onboardingModule} from './onboarding'
import {profileModule} from './profile'

import {moduleRegistry} from '@/core/navigation/ModuleRegistry'

/**
 * Registers all application modules with the module registry.
 * Modules are registered in order, with core modules first, followed by feature modules.
 *
 * To disable a module, either comment out its registration or set `enabled: false`
 * in the module's configuration.
 */
export const registerModules = (): void => {
  moduleRegistry.register(oldModule)
  moduleRegistry.register(authModule)
  moduleRegistry.register(onboardingModule)
  moduleRegistry.register(notificationsModule)
  moduleRegistry.register(profileModule)
}
