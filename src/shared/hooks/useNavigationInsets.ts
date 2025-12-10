import {useMemo} from 'react'

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import {useHeaderHeight} from '@react-navigation/elements'

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
export const useNavigationInsets = (): NavigationInsets => {
  const headerHeight = useHeaderHeight()
  const tabBarHeight = useBottomTabBarHeight()

  return useMemo(
    () => ({
      headerHeight,
      tabBarHeight,
      top: headerHeight,
      bottom: tabBarHeight,
    }),
    [headerHeight, tabBarHeight],
  )
}
