import {clearModuleQueries} from '@/shared/api/queryclient'
import {logger} from '@/shared/lib/logger'
import type {ModuleConfig, ModuleRegistry, ModuleRoute} from '@/shared/types/module'

/**
 * ModuleRegistryManager manages the lifecycle of application modules.
 * It handles module registration, unregistration, initialization, and
 * provides access to module configurations and routes.
 */
class ModuleRegistryManager {
  private modules: ModuleRegistry = {}
  private initialized = false

  /**
   * Registers a module with the registry.
   * Checks for dependencies and calls the module's onRegister hook.
   *
   * @param config - The module configuration to register
   */
  register(config: ModuleConfig): void {
    try {
      if (!config.enabled) {
        logger.info(`Module ${config.name} is disabled`)
        return
      }

      if (config.dependencies) {
        const missingDeps = config.dependencies.filter(
          dep => !this.modules[dep]?.enabled,
        )

        if (missingDeps.length > 0) {
          logger.warn(
            `Module ${config.name} has missing dependencies:`,
            missingDeps,
          )
          return
        }
      }

      this.modules[config.name] = config
      config.onRegister?.()

      logger.info(`Registered module: ${config.name}`)
    } catch (error) {
      logger.error(`Failed to register module ${config.name}:`, error)
    }
  }

  /**
   * Unregisters a module and cleans up its resources.
   * Clears TanStack Query cache and calls the module's onUnregister hook.
   *
   * @param moduleName - The name of the module to unregister
   */
  async unregister(moduleName: string): Promise<void> {
    try {
      const module = this.modules[moduleName]
      if (!module) {
        logger.warn(`Cannot unregister: module ${moduleName} not found`)
        return
      }

      // Clear TanStack Query cache for this module
      await clearModuleQueries(moduleName)

      // Run module cleanup
      await module.onUnregister?.()

      delete this.modules[moduleName]

      logger.info(`Unregistered module: ${moduleName}`)
    } catch (error) {
      logger.error(`Failed to unregister module ${moduleName}:`, error)
    }
  }

  /**
   * Gets all registered modules.
   *
   * @returns The module registry object
   */
  getModules(): ModuleRegistry {
    return this.modules
  }

  /**
   * Gets a specific module by name.
   *
   * @param name - The name of the module to retrieve
   * @returns The module configuration or undefined if not found
   */
  getModule(name: string): ModuleConfig | undefined {
    return this.modules[name]
  }

  /**
   * Gets all enabled modules.
   *
   * @returns Array of enabled module configurations
   */
  getEnabledModules(): ModuleConfig[] {
    return Object.values(this.modules).filter(m => m.enabled)
  }

  /**
   * Gets all routes from all registered modules.
   *
   * @returns Array of module routes
   */
  getRoutes(): ModuleRoute[] {
    return Object.values(this.modules).flatMap(module => module.routes || [])
  }

  /**
   * Initializes all registered modules by calling their onAppStart hooks.
   * Modules are initialized in parallel using Promise.all.
   *
   * @throws Error if any module initialization fails
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      logger.debug('Already initialized, skipping')
      return
    }

    try {
      const modules = this.getEnabledModules()

      await Promise.all(
        modules.map(async module => {
          try {
            await module.onAppStart?.()
          } catch (error) {
            logger.error(`Failed to initialize module ${module.name}:`, error)
            throw error
          }
        }),
      )

      this.initialized = true
      logger.info('All modules initialized')
    } catch (error) {
      logger.error('Module initialization failed:', error)
      throw error
    }
  }
}

export const moduleRegistry = new ModuleRegistryManager()
