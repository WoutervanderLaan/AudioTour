import type {ComponentType} from 'react'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs'
import type {NativeStackNavigationOptions} from '@react-navigation/native-stack'

import type {
  ModalParams,
  ModuleConfig,
  StackParams,
  TabParams,
} from '@/modules/types'

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
    interface RootParamList extends RootStackParams {}
  }
}

/**
 * Registry of all registered modules, keyed by module name.
 */
export type ModuleRegistry = {
  [name: string]: ModuleConfig
}

/**
 * RootStackParams - Combined parameters for all navigation screens in the app.
 * Includes stack screens, modals, tabs, and a special "Tabs" screen for the tab navigator.
 */
export type RootStackParams = StackParams &
  ModalParams &
  TabParams & {Home: undefined}

/**
 * StackNavigationRoutes - Configuration object for stack navigation screens.
 * Maps route names to their component, name, and options.
 */
export type StackNavigationRoutes<
  R extends Record<string, unknown>,
  Route extends string = string,
> = Record<
  Route,
  {
    component: ComponentType<any>
    name: keyof R
    options?: NativeStackNavigationOptions
    screenType?: 'default' | 'settings'
    title?: string
  }
>

/**
 * TabNavigationRoutes - Configuration object for tab navigation screens.
 * Maps route names to their component, name, and options for the bottom tab navigator.
 */
export type TabNavigationRoutes<
  R extends Record<string, unknown>,
  Route extends string = string,
> = Record<
  Route,
  {
    component: ComponentType<any>
    name: keyof R
    options?: BottomTabNavigationOptions
    icon: IconName
  }
>

/**
 * Type representing valid Material Icons names for type-safe icon selection.
 * Extracted from the Material Icons glyph map to ensure only valid icon names are used.
 */
export type IconName = keyof typeof MaterialIcons.glyphMap
