import {authModuleConfig} from '@/modules/auth/module.config'
import {oldModuleConfig} from '@/modules/old'
import {moduleRegistry} from '@/shared/navigation/ModuleRegistry'

/**
 * Registers all application modules with the module registry.
 * Modules are registered in order, with core modules first, followed by feature modules.
 *
 * To disable a module, either comment out its registration or set `enabled: false`
 * in the module's configuration.
 */
export const registerModules = (): void => {
  // Core modules
  moduleRegistry.register(oldModuleConfig)
  moduleRegistry.register(authModuleConfig)

  // Feature modules
  // Add more feature modules here as they are developed
}
