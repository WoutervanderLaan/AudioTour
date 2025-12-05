import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs'
import type {CompositeScreenProps} from '@react-navigation/native'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'

import {ExtractParamList} from './navigationTypes'

import {routes as authRoutes} from '@/modules/auth/navigation/routes'
import {routes as oldRoutes} from '@/modules/old/navigation/routes'

// Gather all module routes
const allRoutes = [...authRoutes, ...oldRoutes] as const

// Extract tab routes
const tabRoutes = allRoutes.filter(r => r.type === 'tab')

// Extract root stack routes (stack + modal)
const rootStackRoutes = allRoutes.filter(
  r => r.type === 'stack' || r.type === 'modal',
)

/**
 * Home tabs parameter list - dynamically generated from module routes.
 * Contains all routes with type: 'tab' from all registered modules.
 */
export type HomeTabsParamList = ExtractParamList<typeof tabRoutes>

/**
 * Root stack parameter list - dynamically generated from module routes.
 * Contains HomeTabs plus all routes with type: 'stack' or 'modal' from all registered modules.
 */
export type RootStackParamList = {
  HomeTabs: undefined
} & ExtractParamList<typeof rootStackRoutes>

/**
 * Root stack screen props helper type
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

/**
 * Home tabs screen props helper type
 */
export type HomeTabsScreenProps<T extends keyof HomeTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabsParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >

/**
 * Global type declaration for React Navigation
 */
declare global {
  namespace ReactNavigation {
    /**
     * RootParamList
     * Global React Navigation type augmentation to provide type-safe navigation throughout the app.
     */
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface RootParamList extends RootStackParamList {}
  }
}

/**
 * Configuration object for a module in the application.
 * Defines metadata, navigation structure, lifecycle hooks, and integration options.
 */
export type ModuleConfig = {
  // Basic metadata
  /**
   * Unique identifier for the module
   */
  name: string
  /**
   * Semantic version of the module (e.g., "1.0.0")
   */
  version: string
  /**
   * Whether the module is enabled and should be loaded
   */
  enabled: boolean

  // Navigation
  /**
   * Optional React component that serves as the module's main navigator
   */
  navigator?: ComponentType<unknown>
  /**
   * Array of routes that this module provides to the root navigator
   */
  routes?: ModuleRoute[]

  // Store integration (Zustand)
  /**
   * Optional Zustand store configuration for the module
   */
  store?: {
    create: StateCreator<unknown>
    persist?: boolean
    devtools?: boolean
  }

  // Dependencies
  /**
   * Array of module names that must be registered before this module
   */
  dependencies?: string[]

  // Lifecycle hooks
  /**
   * Called when the module is registered with the module registry
   */
  onRegister?: () => void | Promise<void>
  /**
   * Called when the module is unregistered from the module registry
   */
  onUnregister?: () => void | Promise<void>
  /**
   * Called during app initialization after all modules are registered
   */
  onAppStart?: () => void | Promise<void>

  // TanStack Query integration
  /**
   * Default query options for this module's TanStack Query hooks
   */
  queries?: {
    refetchOnMount?: boolean
    refetchOnWindowFocus?: boolean
    staleTime?: number
  }
}

/**
 * Represents a navigation route provided by a module.
 * Routes are registered with the root navigator and can have deep linking configuration.
 */
export type ModuleRoute = {
  /**
   * Unique name for the route, used in navigation
   */
  name: string
  /**
   * Optional path for deep linking
   */
  path?: string
  /**
   * React component to render for this route
   */
  screen: ComponentType<unknown>
  /**
   * Navigation options for this route (can be static or dynamic)
   */
  options?: ModuleRouteOptions
  /**
   * Deep linking configuration
   */
  linking?: {
    path: string
    exact?: boolean
  }
}

/**
 * Options that can be passed to a module route.
 * Can be static navigation options or a function that returns options dynamically.
 */
export type ModuleRouteOptions =
  | NativeStackNavigationOptions
  | ((props: {
      route: RouteProp<ParamListBase, string>
      navigation: NativeStackNavigationProp<ParamListBase, string, undefined>
      theme: Theme
    }) => NativeStackNavigationOptions)
  | undefined

/**
 * Registry of all registered modules, keyed by module name.
 */
export type ModuleRegistry = {
  [moduleName: string]: ModuleConfig
}
