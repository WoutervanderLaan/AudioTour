import {useContext} from 'react'

import {BottomTabBarHeightContext} from '@react-navigation/bottom-tabs'

/**
 * useBottomTabBarHeight
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const useBottomTabBarHeight = (): number => {
  const height = useContext(BottomTabBarHeightContext)

  if (height === undefined) {
    return 0
  }

  return height
}
