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
