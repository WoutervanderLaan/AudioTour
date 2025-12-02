import {clearModuleQueries} from '@/shared/api/queryclient'
import type {ModuleConfig, ModuleRegistry} from '@/shared/types/module'

/**
 * ModuleRegistryManager
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
class ModuleRegistryManager {
  private modules: ModuleRegistry = {}
  private initialized = false

  register(config: ModuleConfig): void {
    if (!config.enabled) {
      console.log(`[ModuleRegistry] Module ${config.name} is disabled`)
      return
    }

    if (config.dependencies) {
      const missingDeps = config.dependencies.filter(
        dep => !this.modules[dep]?.enabled,
      )

      if (missingDeps.length > 0) {
        console.warn(
          `[ModuleRegistry] Module ${config.name} has missing dependencies:`,
          missingDeps,
        )
        return
      }
    }

    this.modules[config.name] = config
    config.onRegister?.()

    console.log(`[ModuleRegistry] Registered module: ${config.name}`)
  }

  async unregister(moduleName: string): Promise<void> {
    const module = this.modules[moduleName]
    if (!module) return

    // Clear TanStack Query cache for this module
    await clearModuleQueries(moduleName)

    // Run module cleanup
    await module.onUnregister?.()

    delete this.modules[moduleName]

    console.log(`[ModuleRegistry] Unregistered module: ${moduleName}`)
  }

  getModules(): ModuleRegistry {
    return this.modules
  }

  getModule(name: string): ModuleConfig | undefined {
    return this.modules[name]
  }

  getEnabledModules(): ModuleConfig[] {
    return Object.values(this.modules).filter(m => m.enabled)
  }

  getRoutes(): any[] {
    return Object.values(this.modules).flatMap(module => module.routes || [])
  }

  async initialize(): Promise<void> {
    if (this.initialized) return

    const modules = this.getEnabledModules()

    await Promise.all(modules.map(module => module.onAppStart?.()))

    this.initialized = true
    console.log('[ModuleRegistry] All modules initialized')
  }
}

export const moduleRegistry = new ModuleRegistryManager()
