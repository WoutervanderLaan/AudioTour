import React from 'react'

import {registerDevMenuItems} from 'expo-dev-menu'
import * as SplashScreen from 'expo-splash-screen'

// eslint-disable-next-line no-restricted-imports, boundaries/no-unknown
import StorybookUI from '../../.rnstorybook/'
import {Init} from './init/Init'
import {RootProviders} from './RootProviders'

import {RootNavigator} from '@/core/navigation/RootNavigator'
import {registerModules} from '@/modules/modules'
import {ErrorBoundary} from '@/shared/components/ErrorBoundary'
import {ThemedStatusBar} from '@/shared/components/ThemedStatusBar'

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
export const App = (): React.JSX.Element => (
  <RootProviders>
    <ErrorBoundary>
      <ThemedStatusBar />
      <Init>
        <RootNavigator
          onReady={() => {
            SplashScreen.hideAsync()
          }}
        />
      </Init>
    </ErrorBoundary>
  </RootProviders>
)

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
