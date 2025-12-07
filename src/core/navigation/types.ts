import type {ComponentType} from 'react'

import type {ParamListBase} from '@react-navigation/native'
import type {NativeStackNavigationOptions} from '@react-navigation/native-stack'

import type {ModuleSlug} from '@/modules/slugs'
import type {ModalParams, ModuleStackParams} from '@/modules/stacks'
import type {ModuleConfig} from '@/modules/types'

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
 * ModuleParams
 * TODO: describe what this type represents.
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
 * RootStackParams
 * TODO: describe what this type represents.
 */
export type RootStackParams = ModuleParams<ModuleStackParams> &
  ModuleStackParams &
  ModalParams

/**
 * StackNavigationRoutes
 * TODO: describe what this type represents.
 */
export type StackNavigationRoutes<R, Route extends string = string> = Record<
  Route,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: ComponentType<any>
    name: keyof R
    options?: NativeStackNavigationOptions
    screenType?: 'default' | 'settings'
    title?: string
  }
>
