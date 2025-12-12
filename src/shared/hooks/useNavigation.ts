import {
  type NavigationProp,
  // eslint-disable-next-line no-restricted-imports
  useNavigation as useNavigationRN,
} from '@react-navigation/native'

import type {RootStackParams} from '@/core/navigation/types'

/**
 * useNavigation
 * Type-safe wrapper around React Navigation's useNavigation hook.
 * Provides navigation methods for the app's root navigation stack with full TypeScript support.
 *
 * @returns {NavigationProp<RootStackParams>} Navigation prop with type-safe methods for navigating between screens in the RootStackParams
 */
export const useNavigation = (): NavigationProp<RootStackParams> =>
  useNavigationRN<NavigationProp<RootStackParams>>()
