import {
  type NavigationProp,
  // eslint-disable-next-line no-restricted-imports
  useNavigation as useNavigationRN,
} from '@react-navigation/native'

import type {RootStackParams} from '@/core/navigation/types'

/**
 * useNavigation
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const useNavigation = (): NavigationProp<RootStackParams> =>
  useNavigationRN<NavigationProp<RootStackParams>>()
