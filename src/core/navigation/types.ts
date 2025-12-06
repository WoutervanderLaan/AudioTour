import type {ComponentType} from 'react'

import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs'
import type {
  CompositeScreenProps,
  ParamListBase,
  RouteProp,
  Theme,
} from '@react-navigation/native'
import type {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import type {StateCreator} from 'zustand'

import {ExtractParamList} from './navigationTypes'

import {
  modalRoutes as authModalRoutes,
  stackRoutes as authStackRoutes,
  tabRoutes as authTabRoutes,
} from '@/modules/auth/navigation/routes'
import {
  modalRoutes as oldModalRoutes,
  stackRoutes as oldStackRoutes,
  tabRoutes as oldTabRoutes,
} from '@/modules/old/navigation/routes'

/**
 * Gather all tab routes from all modules.
 * Pre-filtered at compile time for proper type inference.
 */
const _allTabRoutes = [...authTabRoutes, ...oldTabRoutes] as const

/**
 * Gather all stack and modal routes from all modules.
 * Pre-filtered at compile time for proper type inference.
 */
const _allRootStackRoutes = [
  ...authStackRoutes,
  ...authModalRoutes,
  ...oldStackRoutes,
  ...oldModalRoutes,
] as const

/**
 * Home tabs parameter list - statically generated from module tab routes.
 * Contains all routes with type: 'tab' from all registered modules.
 * Type-safe at compile time with proper parameter inference.
 */
export type HomeTabsParamList = ExtractParamList<typeof _allTabRoutes>

/**
 * Root stack parameter list - statically generated from module stack and modal routes.
 * Contains HomeTabs plus all routes with type: 'stack' or 'modal' from all registered modules.
 * Type-safe at compile time with proper parameter inference.
 */
export type RootStackParamList = {
  HomeTabs: undefined
} & ExtractParamList<typeof _allRootStackRoutes>

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
   * @deprecated Use routes with type: 'tab' instead. This property is no longer used
   * in the modular navigation system and will be removed in a future version.
   */
  navigator?: ComponentType<unknown>
  /**
   * Array of routes that this module provides to the navigation system.
   * Routes can be of type 'tab' (bottom tab navigator), 'stack' (regular screen),
   * or 'modal' (modal presentation).
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
 * Route type - defines where and how the route is rendered in the navigation structure
 */
export type RouteType =
  | 'tab' // Rendered in the bottom tab navigator
  | 'stack' // Rendered in the root stack navigator
  | 'modal' // Rendered as a modal in the root stack

/**
 * Represents a navigation route provided by a module.
 * Routes are registered with the root navigator and can have deep linking configuration.
 */
export type ModuleRoute<TParams = Record<string, unknown>> = {
  /**
   * Unique name for the route, used in navigation
   */
  name: string
  /**
   * Route type - determines where the route is rendered (tab, stack, or modal)
   */
  type: RouteType
  /**
   * TypeScript type definition for route parameters
   * Use `undefined` for routes with no parameters
   * Example: {id: string, mode?: 'edit' | 'view'}
   */
  params: TParams
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
