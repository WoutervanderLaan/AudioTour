import {useMemo} from 'react'

// eslint-disable-next-line no-restricted-imports
import {useHeaderHeight} from '@react-navigation/elements'

import {useBottomTabBarHeight} from './useBottomTabBarHeight'

/**
 * NavigationInset
 * Specifies which navigation elements (header, tab bar, or both) should be included
 * in the inset calculations. Use this to selectively add padding for visible navigation elements.
 */
export type NavigationInset = ['header'] | ['tab'] | ['header', 'tab']

/**
 * NavigationInsets
 * Type definition for navigation-related insets (header and tab bar heights)
 */
export type NavigationInsets = {
  /**
   * Height of the header (including safe area)
   */
  headerHeight: number
  /**
   * Height of the bottom tab bar (0 if not on a tab screen)
   */
  tabBarHeight: number
  /**
   * Total top inset (header height)
   */
  top: number
  /**
   * Total bottom inset (tab bar height)
   */
  bottom: number
}

/**
 * useNavigationInsets
 * Custom hook that provides header and tab bar heights for proper content spacing.
 * Use this to add padding to screen content when headers/tab bars are transparent or absolute.
 *
 * @returns {NavigationInsets} Navigation insets with header and tab bar heights
 *
 * @example
 * ```tsx
 * const {top, bottom} = useNavigationInsets()
 *
 * return (
 *   <View style={{paddingTop: top, paddingBottom: bottom}}>
 *     <Text>Content with proper spacing</Text>
 *   </View>
 * )
 * ```
 */
export const useNavigationInsets = (
  includeNavigationPadding?: NavigationInset,
): NavigationInsets => {
  const headerHeight = useHeaderHeight()
  const tabBarHeight = useBottomTabBarHeight()

  const includeHeader = includeNavigationPadding?.some(
    inset => inset === 'header',
  )
  const includeTab = includeNavigationPadding?.some(inset => inset === 'tab')

  return useMemo(
    () => ({
      headerHeight,
      tabBarHeight,
      top: includeHeader ? headerHeight : 0,
      bottom: includeTab ? tabBarHeight : 0,
    }),
    [includeTab, includeHeader, headerHeight, tabBarHeight],
  )
}
