import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs'
import type {CompositeScreenProps} from '@react-navigation/native'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'

import {ExtractParamList} from './navigationTypes'

import {
  tabRoutes as authTabRoutes,
  stackRoutes as authStackRoutes,
  modalRoutes as authModalRoutes,
} from '@/modules/auth/navigation/routes'
import {
  tabRoutes as oldTabRoutes,
  stackRoutes as oldStackRoutes,
  modalRoutes as oldModalRoutes,
} from '@/modules/old/navigation/routes'

/**
 * Gather all tab routes from all modules.
 * Pre-filtered at compile time for proper type inference.
 */
const allTabRoutes = [...authTabRoutes, ...oldTabRoutes] as const

/**
 * Gather all stack and modal routes from all modules.
 * Pre-filtered at compile time for proper type inference.
 */
const allRootStackRoutes = [
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
export type HomeTabsParamList = ExtractParamList<typeof allTabRoutes>

/**
 * Root stack parameter list - statically generated from module stack and modal routes.
 * Contains HomeTabs plus all routes with type: 'stack' or 'modal' from all registered modules.
 * Type-safe at compile time with proper parameter inference.
 */
export type RootStackParamList = {
  HomeTabs: undefined
} & ExtractParamList<typeof allRootStackRoutes>

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
