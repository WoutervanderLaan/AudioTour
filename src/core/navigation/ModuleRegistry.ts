import type {
  ModuleRegistry,
  RootStackParams,
  StackNavigationRoutes,
  TabNavigationRoutes,
} from './types'

import {clearModuleQueries} from '@/core/api/queryclient'
import {logger} from '@/core/lib/logger'
import type {ModuleSlug} from '@/modules/slugs'
import type {ModuleConfig} from '@/modules/types'

/**
 * ModuleRegistryManager manages the lifecycle of application modules.
 * It handles module registration, unregistration, initialization, and
 * provides access to module configurations and routes.
 */
class ModuleRegistryManager {
  private modules: ModuleRegistry = {}
  private pendingModules: ModuleConfig[] = []
  private initialized = false

  /**
   * Registers a module with the registry.
   * Modules are collected first and dependencies are resolved later
   * via resolveDependencies() to ensure registration order doesn't matter.
   *
   * @param config - The module configuration to register
   */
  register(config: ModuleConfig): void {
    try {
      if (!config.enabled) {
        logger.warn(`Module ${config.name} is disabled`)
        return
      }

      // Check for duplicate registration
      if (this.pendingModules.some(m => m.name === config.name)) {
        logger.warn(`Module ${config.name} is already registered`)
        return
      }

      // Add to pending modules (phase 1: collection)
      this.pendingModules.push(config)
      logger.debug(`Collected module: ${config.name}`)
    } catch (error) {
      logger.error(`Failed to collect module ${config.name}:`, error)
    }
  }

  /**
   * Resolves dependencies and finalizes module registration.
   * This method should be called after all modules have been registered
   * via the register() method. It performs dependency validation and
   * only includes modules with satisfied dependencies.
   */
  resolveDependencies(): void {
    logger.separator('=', 60)
    logger.group('Module Dependency Resolution')

    const enabledPending = this.pendingModules.filter(m => m.enabled)
    const enabledNames = new Set(enabledPending.map(m => m.name))

    logger.info(`Resolving dependencies for ${enabledPending.length} modules`)

    // Phase 2: Validate dependencies and register modules
    for (const config of enabledPending) {
      try {
        if (config.dependencies && config.dependencies.length > 0) {
          const missingDeps = config.dependencies.filter(
            dep => !enabledNames.has(dep),
          )

          if (missingDeps.length > 0) {
            logger.warn(
              `Module ${config.name} has missing dependencies: ${missingDeps.join(', ')}`,
            )
            continue
          }
        }

        // Add to active modules
        this.modules[config.name] = config

        // Call onRegister hook
        config.onRegister?.()

        logger.success(`Registered module: ${config.name}`)
      } catch (error) {
        logger.error(`Failed to register module ${config.name}:`, error)
      }
    }

    logger.groupEnd()
    logger.separator('=', 60)

    // Clear pending modules after resolution
    this.pendingModules = []
  }

  /**
   * Unregisters a module and cleans up its resources.
   * Clears TanStack Query cache and calls the module's onUnregister hook.
   *
   * @param moduleName - The name of the module to unregister
   */
  async unregister(moduleName: ModuleSlug): Promise<void> {
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

      logger.success(`Unregistered module: ${moduleName}`)
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
  getModule(name: ModuleSlug): ModuleConfig | undefined {
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
   * Gets all stack screens from all registered modules.
   * Stack screens appear above tabs and hide the tab bar.
   *
   * @returns Object mapping route names to stack screen configurations
   */
  getStacks(): StackNavigationRoutes<RootStackParams> {
    return Object.values(this.modules).reduce((acc, {stacks}) => {
      if (stacks) {
        const collisions = Object.keys(stacks).filter(key => key in acc)

        if (collisions.length > 0) {
          logger.error(
            `Stack route collision detected: ${collisions.join(', ')}. Later module will override.`,
          )
        }
        return {...acc, ...stacks}
      }
      return acc
    }, {})
  }

  /**
   * Gets all modal screens from all registered modules.
   * Modals appear with modal presentation style.
   *
   * @returns Object mapping route names to modal screen configurations
   */
  getModals(): StackNavigationRoutes<RootStackParams> {
    return Object.values(this.modules).reduce((acc, {modals}) => {
      if (modals) {
        const collisions = Object.keys(modals).filter(key => key in acc)

        if (collisions.length > 0) {
          logger.error(
            `Modal route collision detected: ${collisions.join(', ')}. Later module will override.`,
          )
        }
        return {...acc, ...modals}
      }
      return acc
    }, {})
  }

  /**
   * Gets all tab screens from all registered modules.
   * Tab screens appear in the bottom tab navigator.
   *
   * @returns Object mapping route names to tab screen configurations
   */
  getTabs(): TabNavigationRoutes<RootStackParams> {
    return Object.values(this.modules).reduce((acc, {tabs}) => {
      if (tabs) {
        const collisions = Object.keys(tabs).filter(key => key in acc)

        if (collisions.length > 0) {
          logger.error(
            `Tab route collision detected: ${collisions.join(', ')}. Later module will override.`,
          )
        }
        return {...acc, ...tabs}
      }
      return acc
    }, {})
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

    logger.separator('=', 60)
    logger.group('Module Initialization')

    const modules = this.getEnabledModules()

    // Display registered modules in a table
    const moduleTable = modules.map(m => ({
      module: m.name,
      stacks: Object.keys(m.stacks || {}).length,
      tabs: Object.keys(m.tabs || {}).length,
      modals: Object.keys(m.modals || {}).length,
      dependencies: m.dependencies?.join(', ') || 'none',
    }))

    logger.table(moduleTable, 'Registered Modules')
    logger.separator()

    // Use allSettled to allow other modules to initialize even if one fails
    const results = await Promise.allSettled(
      modules.map(async module => {
        try {
          logger.info(`Initializing ${module.name}...`)
          await module.onAppStart?.()
          logger.success(`${module.name} initialized`)
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

    logger.separator()
    if (failed > 0) {
      logger.warn(
        `Module initialization completed: ${successful} succeeded, ${failed} failed`,
      )
    } else {
      logger.success(`All ${successful} modules initialized successfully`)
    }

    logger.groupEnd()
    logger.separator('=', 60)

    this.initialized = true
  }
}

export const moduleRegistry = new ModuleRegistryManager()
