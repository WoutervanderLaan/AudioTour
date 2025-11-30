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
import {queryClient} from './init/queryclient'
import {linking} from './navigation/linking'

import {Navigation} from '@/app/navigation'
import {ApiProvider} from '@/shared/context/api/ApiContext.Provider'
import {KeyboardProvider} from '@/shared/context/keyboard/KeyboardContext.provider'
import {ToastProvider} from '@/shared/context/toast/ToastContext.provider'

SplashScreen.preventAutoHideAsync()

/**
 * App
 * Root entry of the app.
 *
 * @returns {Element} The App root
 */
export const App = (): React.JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <KeyboardProvider>
            <ToastProvider>
              <Init />
              <Navigation
                linking={linking}
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
