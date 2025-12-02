import * as React from 'react'
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

import {registerModules} from './config/modules'

import {queryClient} from '@/shared/api/queryclient'
import {ApiProvider} from '@/shared/context/api/ApiContext.Provider'
import {KeyboardProvider} from '@/shared/context/keyboard/KeyboardContext.provider'
import {ToastProvider} from '@/shared/context/toast/ToastContext.provider'
import {moduleRegistry} from '@/shared/navigation/ModuleRegistry'
import {RootNavigator} from '@/shared/navigation/RootNavigator'

SplashScreen.preventAutoHideAsync()

/**
 * App
 * Root entry point of the application.
 * Initializes modules, providers, and navigation structure.
 *
 * @returns The App root component
 */
export const App = (): React.JSX.Element => {
  React.useEffect(() => {
    // Register all modules and initialize them asynchronously
    const initializeApp = async (): Promise<void> => {
      try {
        // Register all modules first (synchronous)
        registerModules()
        // Then initialize them (potentially async)
        await moduleRegistry.initialize()
      } catch (error) {
        console.error('Failed to initialize app:', error)
        // Continue running the app even if initialization fails
        // Individual module errors are already logged by the ModuleRegistry
      }
    }

    initializeApp()

    // Cleanup function for when the component unmounts
    return () => {
      // Future: Add cleanup logic here if needed (e.g., unregister modules)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <KeyboardProvider>
            <ToastProvider>
              <Init />
              <RootNavigator
                onReady={() => {
                  SplashScreen.hideAsync()
                }}
              />
            </ToastProvider>
          </KeyboardProvider>
        </SafeAreaProvider>
      </ApiProvider>
    </QueryClientProvider>
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
