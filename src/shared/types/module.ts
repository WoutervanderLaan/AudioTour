import {ComponentType} from 'react'

import type {ParamListBase, RouteProp, Theme} from '@react-navigation/native'
import type {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import {StateCreator} from 'zustand'

/**
 * ModuleConfig
 * TODO: describe what this type represents.
 */
export type ModuleConfig = {
  // Basic metadata
  /**
   * name
   */
  name: string
  /**
   * version
   */
  version: string
  /**
   * enabled
   */
  enabled: boolean

  // Navigation
  /**
   * navigator
   */
  navigator?: ComponentType<unknown>
  /**
   * routes
   */
  routes?: ModuleRoute[]

  // Store integration (Zustand)
  /**
   * store
   */
  store?: {
    create: StateCreator<unknown>
    persist?: boolean
    devtools?: boolean
  }

  // Dependencies
  /**
   * dependencies
   */
  dependencies?: string[]

  // Lifecycle hooks
  /**
   * onRegister
   */
  onRegister?: () => void | Promise<void>
  /**
   * onUnregister
   */
  onUnregister?: () => void | Promise<void>
  /**
   * onAppStart
   */
  onAppStart?: () => void | Promise<void>

  // TanStack Query integration
  /**
   * queries
   */
  queries?: {
    refetchOnMount?: boolean
    refetchOnWindowFocus?: boolean
    staleTime?: number
  }
}

/**
 * ModuleRoute
 * TODO: describe what this type represents.
 */
export type ModuleRoute = {
  /**
   * name
   */
  name: string
  /**
   * path
   */
  path?: string
  /**
   * screen
   */
  screen: ComponentType<unknown>
  /**
   * options
   */
  options?: ModuleRouteOptions
  /**
   * linking
   */
  linking?: {
    path: string
    exact?: boolean
  }
}

/**
 * ModuleRouteOptions
 * TODO: describe what this type represents.
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
 * ModuleRegistry
 * TODO: describe what this type represents.
 */
export type ModuleRegistry = {
  [moduleName: string]: ModuleConfig
}
