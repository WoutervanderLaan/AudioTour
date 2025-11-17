import {QueryClientProvider} from '@tanstack/react-query'
import * as SplashScreen from 'expo-splash-screen'
import * as React from 'react'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'
import {StyleSheet} from 'react-native-unistyles'

import {Navigation} from '@/app/navigation'
import {ApiProvider} from '@/shared/lib/api/Provider'
import {ToastProvider} from '@/store/context/ToastContext'

import {Init} from './init/Init'
import {queryClient} from './init/queryclient'
import {linking} from './navigation/linking'

SplashScreen.preventAutoHideAsync()

/**
 * App
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export function App() {
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
