import {authModule} from './auth'
import {historyModule} from './history'
import {notificationsModule} from './notifications'
import {onboardingModule} from './onboarding'
import {profileModule} from './profile'
import {tourModule} from './tour'

import {moduleRegistry} from '@/core/navigation/ModuleRegistry'

/**
 * Registers all application modules with the module registry.
 * Uses a two-phase registration process:
 * 1. Collect all modules (order-independent)
 * 2. Resolve dependencies and finalize registration
 *
 * To disable a module, either comment out its registration or set `enabled: false`
 * in the module's configuration.
 */
export const registerModules = (): void => {
  // Phase 1: Collect all modules (order doesn't matter)
  moduleRegistry.register(authModule)
  moduleRegistry.register(historyModule)
  moduleRegistry.register(notificationsModule)
  moduleRegistry.register(profileModule)
  moduleRegistry.register(onboardingModule)
  moduleRegistry.register(tourModule)

  // Phase 2: Resolve dependencies and finalize registration
  moduleRegistry.resolveDependencies()
}
