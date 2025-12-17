import {authModule} from './auth'
import {notificationsModule} from './notifications'
import {onboardingModule} from './onboarding'
import {profileModule} from './profile'
import {tourModule} from './tour'

import {moduleRegistry} from '@/core/navigation/ModuleRegistry'

/**
 * Registers all application modules with the module registry.
 * Modules are registered in order, with core modules first, followed by feature modules.
 *
 * To disable a module, either comment out its registration or set `enabled: false`
 * in the module's configuration.
 */
export const registerModules = (): void => {
  moduleRegistry.register(authModule)
  moduleRegistry.register(notificationsModule)
  moduleRegistry.register(profileModule)
  moduleRegistry.register(onboardingModule)
  moduleRegistry.register(tourModule)
}
