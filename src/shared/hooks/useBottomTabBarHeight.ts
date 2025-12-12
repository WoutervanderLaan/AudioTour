import {useContext} from 'react'

import {BottomTabBarHeightContext} from '@react-navigation/bottom-tabs'

/**
 * Hook that retrieves the current height of the bottom tab bar from React Navigation.
 * Returns 0 if the context is not available (e.g., when not rendered within a tab navigator).
 *
 * @returns The height of the bottom tab bar in pixels, or 0 if unavailable
 */
export const useBottomTabBarHeight = (): number => {
  const height = useContext(BottomTabBarHeightContext)

  if (height === undefined) {
    return 0
  }

  return height
}
