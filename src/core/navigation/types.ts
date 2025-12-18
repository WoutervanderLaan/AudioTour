import type {ComponentType} from 'react'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs'
import type {ParamListBase} from '@react-navigation/native'
import type {NativeStackNavigationOptions} from '@react-navigation/native-stack'

import type {ModuleSlug} from '@/modules/slugs'
import type {
  ModalParams,
  ModuleConfig,
  ModuleStackParams,
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
 * ModuleParams - Type for nested navigation to module screens (legacy, to be removed).
 * Allows navigation like: navigate(ModuleSlug.old, { screen: OldRouteName.notFound })
 *
 * Note: With the new architecture, direct navigation is preferred: navigate(OldRouteName.notFound)
 */
type ModuleParams<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = Extract<keyof ParamList, string>,
> = Record<
  ModuleSlug,
  | undefined
  | {screen?: RouteName}
  | {params: ParamList[RouteName]; screen: RouteName}
>

/**
 * RootStackParams - Combined parameters for all navigation screens in the app.
 * Includes stack screens, modals, tabs, and a special "Tabs" screen for the tab navigator.
 */
export type RootStackParams = ModuleParams<ModuleStackParams> &
  ModuleStackParams &
  ModalParams &
  TabParams & {
    Tabs: undefined
  }

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
