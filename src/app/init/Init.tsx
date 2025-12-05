import type React from 'react'
import {useEffect} from 'react'
import {StatusBar} from 'react-native'
import {UnistylesRuntime} from 'react-native-unistyles'

import * as NavigationElements from '@react-navigation/elements'
import {Asset} from 'expo-asset'

Asset.loadAsync([...NavigationElements.Assets])

/**
 * enableMocking
 * Enables MSW (Mock Service Worker) for API mocking in development mode.
 *
 * @returns {*} Promise that resolves when mocking is enabled
 */
async function enableMocking(): Promise<void> {
  await import('@/core/api/mocks/msw.polyfills')
  const {server} = await import('@/core/api/mocks/server.native')
  server.listen()
}

/**
 * Init
 * Initialization component that sets up development tools (MSW mocking) and configures the status bar theme.
 *
 * @returns {*} StatusBar component with theme-aware styling
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
