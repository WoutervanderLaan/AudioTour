import React, {
  Fragment,
  type PropsWithChildren,
  useEffect,
  useState,
} from 'react'
import {LogBox} from 'react-native'

import {logger} from '@/core/lib/logger/logger'
import {moduleRegistry} from '@/core/navigation/ModuleRegistry'
import {useAuthStateListener} from '@/modules/auth/hooks/useAuthStateListener'
import {useFonts} from '@/shared/hooks/useFonts'

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
export const Init = ({children}: PropsWithChildren): React.JSX.Element => {
  const [isReady, setIsReady] = useState(false)
  const {fontError, fontsLoaded} = useFonts()
  useAuthStateListener()

  useEffect(() => {
    if (__DEV__) {
      // Disable red box error screen to let ErrorBoundary handle errors
      // Comment this out to re-enable the dev error overlay
      LogBox.ignoreAllLogs(true)
      enableMocking()
    }
  }, [])

  useEffect(() => {
    /**
     * initializeApp
     * Initializes all registered modules by calling their onAppStart hooks and handles errors gracefully.
     *
     * @returns Promise that resolves when all modules are initialized
     */
    const initializeApp = async (): Promise<void> => {
      try {
        await moduleRegistry.initialize()
      } catch (error) {
        logger.error('Failed to initialize app:', error)
      } finally {
        setIsReady(true)
      }
    }

    initializeApp()

    return (): void => {
      // Future: Add cleanup logic here if needed (e.g., unregister modules)
    }
  }, [])

  useEffect(() => {
    if (fontError) {
      logger.error('Failed to load fonts:', fontError)
    }
  }, [fontError])

  return <Fragment>{!!isReady && !!fontsLoaded && children}</Fragment>
}
