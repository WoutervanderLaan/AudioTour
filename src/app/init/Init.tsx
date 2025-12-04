import type React from 'react'
import {useEffect} from 'react'
import {StatusBar} from 'react-native'
import {UnistylesRuntime} from 'react-native-unistyles'

import * as NavigationElements from '@react-navigation/elements'
import {Asset} from 'expo-asset'

Asset.loadAsync([...NavigationElements.Assets])

/**
 * enableMocking
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
async function enableMocking(): Promise<void> {
  if (!__DEV__) {
    return
  }

  await import('@/core/api/mocks/msw.polyfills')
  const {server} = await import('@/core/api/mocks/server.native')
  server.listen()
}

/**
 * Init
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const Init = (): React.JSX.Element => {
  useEffect(() => {
    if (__DEV__) {
      enableMocking()
    }

    UnistylesRuntime.setRootViewBackgroundColor('blue')
  }, [])

  return (
    <StatusBar
      barStyle={
        UnistylesRuntime.colorScheme === 'dark'
          ? 'light-content'
          : 'dark-content'
      }
      animated
    />
  )
}
