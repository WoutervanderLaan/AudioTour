import * as NavigationElements from '@react-navigation/elements'
import {DarkTheme, DefaultTheme} from '@react-navigation/native'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Asset} from 'expo-asset'
import {createURL} from 'expo-linking'
import * as SplashScreen from 'expo-splash-screen'
import * as React from 'react'
import {StatusBar, useColorScheme} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import {Navigation} from './navigation'
import {ApiProvider} from './state/ApiContext'
import {ToastProvider} from './state/ToastContext'

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
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        animated
      />
      <ApiProvider>
        <SafeAreaProvider>
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
