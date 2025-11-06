import * as NavigationElements from '@react-navigation/elements'
import {DarkTheme, DefaultTheme} from '@react-navigation/native'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Asset} from 'expo-asset'
import {createURL} from 'expo-linking'
import * as SplashScreen from 'expo-splash-screen'
import * as React from 'react'
import {StatusBar, StyleSheet, useColorScheme} from 'react-native'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'

import {Navigation} from '@/app/navigation'
import {ApiProvider} from '@/lib/api/Provider'
import {ToastProvider} from '@/store/context/ToastContext'

Asset.loadAsync([...NavigationElements.Assets])

SplashScreen.preventAutoHideAsync()

const prefix = createURL('/')

const queryClient = new QueryClient()

/**
 * App
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export function App() {
  const colorScheme = useColorScheme()

  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme

  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          animated
        />
        <SafeAreaProvider
          style={styles.appContainer}
          initialMetrics={initialWindowMetrics}>
          <ToastProvider theme={theme}>
            <Navigation
              theme={theme}
              linking={{
                enabled: 'auto',
                prefixes: [prefix],
              }}
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

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#ffffff', // TODO: implement theming
  },
})
