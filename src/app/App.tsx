import * as React from 'react'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'
import {StyleSheet} from 'react-native-unistyles'

import {QueryClientProvider} from '@tanstack/react-query'
import {registerDevMenuItems} from 'expo-dev-menu'
import * as SplashScreen from 'expo-splash-screen'

// eslint-disable-next-line no-restricted-imports, boundaries/no-unknown
import StorybookUI from '../../.rnstorybook/'
import {Init} from './init/Init'
import {queryClient} from './init/queryclient'
import {linking} from './navigation/linking'

import {Navigation} from '@/app/navigation'
import {ApiProvider} from '@/shared/lib/api/Provider'
import {ToastProvider} from '@/store/context/ToastContext'

SplashScreen.preventAutoHideAsync()

/**
 * App
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const App = (): React.JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider>
        <SafeAreaProvider
          style={styles.appContainer}
          initialMetrics={initialWindowMetrics}>
          <ToastProvider>
            <Init />
            <Navigation
              linking={linking}
              onReady={() => {
                SplashScreen.hideAsync()
              }}
            />
          </ToastProvider>
        </SafeAreaProvider>
      </ApiProvider>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create(({color}) => ({
  appContainer: {
    backgroundColor: color.screen.background.default,
  },
}))

/**
 * StoryBookWrapper
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
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
