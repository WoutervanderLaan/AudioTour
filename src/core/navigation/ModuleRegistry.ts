import {clearModuleQueries} from '@/core/api/queryclient'
import {logger} from '@/core/lib/logger'
import type {
  ModuleConfig,
  ModuleRegistry,
  ModuleRoute,
} from '@/core/navigation/types'

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
   * Gets all tab routes from all registered modules.
   * Tab routes are rendered in the bottom tab navigator.
   *
   * @returns Array of tab routes
   */
  getTabRoutes(): ModuleRoute[] {
    return this.getRoutes().filter(route => route.type === 'tab')
  }

  /**
   * Gets all stack routes from all registered modules.
   * Stack routes are rendered in the root stack navigator (not tabs or modals).
   *
   * @returns Array of stack routes
   */
  getStackRoutes(): ModuleRoute[] {
    return this.getRoutes().filter(route => route.type === 'stack')
  }

  /**
   * Gets all modal routes from all registered modules.
   * Modal routes are rendered as modals in the root stack navigator.
   *
   * @returns Array of modal routes
   */
  getModalRoutes(): ModuleRoute[] {
    return this.getRoutes().filter(route => route.type === 'modal')
  }

  /**
   * Gets all non-tab routes (stack + modal) from all registered modules.
   * These are routes that should be registered in the root stack navigator.
   *
   * @returns Array of stack and modal routes
   */
  getRootStackRoutes(): ModuleRoute[] {
    return this.getRoutes().filter(
      route => route.type === 'stack' || route.type === 'modal',
    )
  }

  /**
   * Initializes all registered modules by calling their onAppStart hooks.
   * Uses Promise.allSettled to ensure graceful degradation - if one module fails,
   * others will still be initialized. Failed modules are logged but don't prevent
   * app startup.
   *
   * @returns Promise that resolves when all modules have been processed
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      logger.debug('Already initialized, skipping')
      return
    }

    const modules = this.getEnabledModules()

    // Use allSettled to allow other modules to initialize even if one fails
    const results = await Promise.allSettled(
      modules.map(async module => {
        try {
          await module.onAppStart?.()
          return {module: module.name, success: true}
        } catch (error) {
          logger.error(`Failed to initialize module ${module.name}:`, error)
          return {module: module.name, success: false, error}
        }
      }),
    )

    // Log summary of initialization results
    const successful = results.filter(r => r.status === 'fulfilled').length
    const failed = results.filter(r => r.status === 'rejected').length

    if (failed > 0) {
      logger.warn(
        `Module initialization completed with errors: ${successful} succeeded, ${failed} failed`,
      )
    } else {
      logger.info(`All ${successful} modules initialized successfully`)
    }

    this.initialized = true
  }
}

export const moduleRegistry = new ModuleRegistryManager()
