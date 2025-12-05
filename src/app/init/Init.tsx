import type React from 'react'
import {useEffect} from 'react'

import * as NavigationElements from '@react-navigation/elements'
import {Asset} from 'expo-asset'

import {ThemedStatusBar} from '@/shared/components/ui/ThemedStatusBar'

Asset.loadAsync([...NavigationElements.Assets])

/**
 * enableMocking
 * Enables MSW (Mock Service Worker) for API mocking in development mode.
 *
 * @returns {*} Promise that resolves when mocking is enabled
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
 * Initialization component that sets up development tools (MSW mocking) and configures the status bar theme.
 * Uses ThemedStatusBar which automatically adapts to light/dark theme changes.
 *
 * @returns {*} ThemedStatusBar component with automatic theme-aware styling
 */
export const Init = (): React.JSX.Element => {
  useEffect(() => {
    if (__DEV__) {
      enableMocking()
    }
  }, [])

  return <ThemedStatusBar />
}
