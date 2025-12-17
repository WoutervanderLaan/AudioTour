import type React from 'react'
import {useEffect} from 'react'

// eslint-disable-next-line no-restricted-imports
import * as NavigationElements from '@react-navigation/elements'
import {Asset} from 'expo-asset'

import {useAuthStateListener} from '@/modules/auth/hooks/useAuthStateListener'
import {ThemedStatusBar} from '@/shared/components/ThemedStatusBar'

Asset.loadAsync([...NavigationElements.Assets])

/**
 * enableMocking
 * Enables MSW (Mock Service Worker) for API mocking in development mode.
 *
 * @returns Promise that resolves when mocking is enabled
 */
async function enableMocking(): Promise<void> {
  await import('@/core/api/mock-config/msw.polyfills')
  const {server} = await import('@/core/api/mock-config/server.native')
  server.listen()
}

/**
 * Init
 * Initialization component that sets up development tools (MSW mocking) and configures the status bar theme.
 * Uses ThemedStatusBar which automatically adapts to light/dark theme changes.
 *
 * @returns ThemedStatusBar component with automatic theme-aware styling
 */
export const Init = (): React.JSX.Element => {
  useAuthStateListener()

  useEffect(() => {
    if (__DEV__) {
      enableMocking()
    }
  }, [])

  return <ThemedStatusBar />
}
