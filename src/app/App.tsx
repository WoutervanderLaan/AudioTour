import React, {Fragment, useEffect, useState} from 'react'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'

import {QueryClientProvider} from '@tanstack/react-query'
import {registerDevMenuItems} from 'expo-dev-menu'
import * as SplashScreen from 'expo-splash-screen'

// eslint-disable-next-line no-restricted-imports, boundaries/no-unknown
import StorybookUI from '../../.rnstorybook/'
import {Init} from './init/Init'

import {queryClient} from '@/core/api/queryclient'
import {logger} from '@/core/lib/logger'
import {moduleRegistry} from '@/core/navigation/ModuleRegistry'
import {RootNavigator} from '@/core/navigation/RootNavigator'
import {registerModules} from '@/modules/modules'
import {ErrorBoundary} from '@/shared/components/ErrorBoundary'
import {BannerProvider} from '@/shared/context/banner/BannerContext.provider'
import {KeyboardProvider} from '@/shared/context/keyboard/KeyboardContext.provider'
import {ToastProvider} from '@/shared/context/toast/ToastContext.provider'
import {useFonts} from '@/shared/hooks/useFonts'

SplashScreen.preventAutoHideAsync()

// Register modules synchronously before app renders to ensure routes are available
// This must happen before the RootNavigator is created
registerModules()

/**
 * App
 * Root entry point of the application.
 * Initializes modules, providers, and navigation structure.
 * Waits for custom fonts to load before hiding splash screen.
 *
 * @returns The App root component
 */
export const App = (): React.JSX.Element => {
  const [isReady, setIsReady] = useState(false)
  const {fontsLoaded, fontError} = useFonts()

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

  if (!isReady || !fontsLoaded) {
    return <Fragment />
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <KeyboardProvider>
            <ToastProvider>
              <BannerProvider>
                <Init />
                <RootNavigator
                  onReady={() => {
                    SplashScreen.hideAsync()
                  }}
                />
              </BannerProvider>
            </ToastProvider>
          </KeyboardProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

/**
 * StoryBookWrapper
 * In __DEV__ we can access Storybook on device through DevMenu. This wrapper processes the switching between App and Storybook.
 *
 * @returns {Element} Either the App root, or StorybookUI
 */
export const StoryBookSwitch = (): React.JSX.Element => {
  const [isStorybook, setIsStorybook] = React.useState(false)

  React.useEffect(() => {
    registerDevMenuItems([
      {
        name: 'Toggle Storybook',
        callback: (): void => {
          setIsStorybook(prev => !prev)
        },
        shouldCollapse: true,
      },
    ])
  }, [])

  return (
    <React.Fragment>
      {!!isStorybook && <StorybookUI />}
      {!isStorybook && <App />}
    </React.Fragment>
  )
}
