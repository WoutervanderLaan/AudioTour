/* eslint-disable boundaries/element-types */ //TODO: fix dependencies and folder structure issues
import {authModuleConfig} from '@/modules/auth/module.config'
import {oldModuleConfig} from '@/modules/old'
import {moduleRegistry} from '@/shared/navigation/ModuleRegistry'

/**
 * Register all application modules
 *
 * Comment out or set ```enabled: false``` to disable modules
 */
export const registerModules = (): void => {
  // Core modules
  moduleRegistry.register(oldModuleConfig)
  moduleRegistry.register(authModuleConfig)

  // Feature modules

  // Add more modules here
}
