import React, {useMemo} from 'react'
import {UnistylesRuntime, useUnistyles} from 'react-native-unistyles'

import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs'
import type {NativeStackNavigationOptions} from '@react-navigation/native-stack'

import {BlurHeader} from '@/shared/components/ui/navigation/BlurHeader'

/**
 * NavigationThemeOptions
 * Type definition for navigation theme options that can be used across navigators
 */
export type NavigationThemeOptions = {
  /**
   * header
   */
  header: {
    backgroundColor: string
    tintColor: string
    titleColor: string
  }
  /**
   * tabBar
   */
  tabBar: {
    backgroundColor: string
    activeTintColor: string
    inactiveTintColor: string
  }
  /**
   * statusBar
   */
  statusBar: {
    barStyle: 'light-content' | 'dark-content'
    backgroundColor: string
  }
}

/**
 * useNavigationTheme
 * Custom hook that provides theme-aware navigation styling options.
 * Returns colors and styles that automatically adapt to light/dark theme changes.
 * Uses UnistylesRuntime.colorScheme for reliable theme detection.
 *
 * @returns {NavigationThemeOptions} Navigation theme options for headers, tabs, and status bar
 *
 * @example
 * ```tsx
 * const {header, tabBar} = useNavigationTheme()
 * <Tab.Navigator screenOptions={{
 *   headerStyle: {backgroundColor: header.backgroundColor},
 *   headerTintColor: header.tintColor
 * }} />
 * ```
 */
export const useNavigationTheme = (): NavigationThemeOptions => {
  const {theme} = useUnistyles()

  return useMemo(
    () => ({
      header: {
        backgroundColor: theme.color.screen.background.default,
        tintColor: theme.color.text.link,
        titleColor: theme.color.text.default,
      },
      tabBar: {
        backgroundColor: theme.color.screen.background.default,
        activeTintColor: theme.color.text.link,
        inactiveTintColor: theme.color.text.secondary,
      },
      statusBar: {
        barStyle:
          UnistylesRuntime.colorScheme === 'dark'
            ? 'light-content'
            : 'dark-content',
        backgroundColor: theme.color.screen.background.default,
      },
    }),
    [theme],
  )
}

/**
 * getStackNavigatorOptions
 * Returns React Navigation stack navigator screen options that adapt to the theme.
 *
 * @param {NavigationThemeOptions} navTheme - Navigation theme options from useNavigationTheme
 * @returns {NativeStackNavigationOptions} Stack navigator screen options
 *
 * @example
 * ```tsx
 * const navTheme = useNavigationTheme()
 * <Stack.Navigator screenOptions={getStackNavigatorOptions(navTheme)} />
 * ```
 */
export const getStackNavigatorOptions = (
  navTheme: NavigationThemeOptions,
): NativeStackNavigationOptions => ({
  headerStyle: {
    backgroundColor: navTheme.header.backgroundColor,
  },
  headerTintColor: navTheme.header.tintColor,
  headerTitleStyle: {
    color: navTheme.header.titleColor,
  },
})

/**
 * getTabNavigatorOptions
 * Returns React Navigation bottom tab navigator screen options that adapt to the theme.
 *
 * @param {NavigationThemeOptions} navTheme - Navigation theme options from useNavigationTheme
 * @param {boolean} useBlur - Whether to use blur tab bar. Defaults to false
 * @returns {BottomTabNavigationOptions} Tab navigator screen options
 *
 * @example
 * ```tsx
 * const navTheme = useNavigationTheme()
 * <Tab.Navigator screenOptions={getTabNavigatorOptions(navTheme, true)} />
 * ```
 */
export const getTabNavigatorOptions = (
  navTheme: NavigationThemeOptions,
  useBlur: boolean = false,
): BottomTabNavigationOptions => ({
  headerStyle: {
    backgroundColor: navTheme.header.backgroundColor,
  },
  headerTintColor: navTheme.header.tintColor,
  headerTitleStyle: {
    color: navTheme.header.titleColor,
  },
  tabBarStyle: useBlur
    ? {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        elevation: 0,
      }
    : {
        backgroundColor: navTheme.tabBar.backgroundColor,
      },
  tabBarActiveTintColor: navTheme.tabBar.activeTintColor,
  tabBarInactiveTintColor: navTheme.tabBar.inactiveTintColor,
})

/**
 * getBlurHeaderOptions
 * Returns React Navigation screen options with a blurred header.
 * Uses expo-blur's BlurView for glassmorphism effect.
 *
 * @param {number} intensity - Blur intensity (0-100). Defaults to 80
 * @returns {NativeStackNavigationOptions} Screen options with blur header
 *
 * @example
 * ```tsx
 * <Stack.Screen
 *   name="Details"
 *   component={DetailsScreen}
 *   options={getBlurHeaderOptions(90)}
 * />
 * ```
 */
export const getBlurHeaderOptions = (
  intensity: number = 80,
): NativeStackNavigationOptions => ({
  headerShown: true,
  headerTransparent: true,
  header: props => React.createElement(BlurHeader, {...props, intensity}),
})
