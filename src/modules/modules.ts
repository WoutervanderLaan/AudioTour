import {authModule} from './auth'
import {homeModule} from './home'
import {notificationsModule} from './notifications'

import {moduleRegistry} from '@/modules/ModuleRegistry'

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
  moduleRegistry.register(homeModule)
  moduleRegistry.register(notificationsModule)

  // Phase 2: Resolve dependencies and finalize registration
  moduleRegistry.resolveDependencies()
}
