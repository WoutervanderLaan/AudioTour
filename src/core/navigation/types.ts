import {ComponentType} from 'react'

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
import {StateCreator} from 'zustand'

/**
 * Root stack parameter list - defines all screens accessible from the root navigator
 */
export type RootStackParamList = {
  // Main tabs navigator
  /**
   * HomeTabs
   */
  HomeTabs: undefined

  // Old module screens (modal/detail screens)
  /**
   * ObjectDetail
   */
  ObjectDetail: {id: string}
  /**
   * Narrative
   */
  Narrative: {id: string}
  /**
   * Settings
   */
  Settings: undefined
  /**
   * NotFound
   */
  NotFound: undefined

  // Auth module screens
  /**
   * Login
   */
  Login: undefined
  /**
   * Register
   */
  Register: undefined
}

/**
 * Home tabs parameter list - defines all tabs in the bottom tab navigator
 */
export type HomeTabsParamList = {
  /**
   * Capture
   */
  Capture: undefined
  /**
   * Museum
   */
  Museum: undefined
  /**
   * Recommendations
   */
  Recommendations: undefined
}

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
     * TODO: describe what this type represents.
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
