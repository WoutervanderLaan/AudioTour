import {useUnistyles} from 'react-native-unistyles'
import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs'
import type {NativeStackNavigationOptions} from '@react-navigation/native-stack'

/**
 * NavigationThemeOptions
 * Type definition for navigation theme options that can be used across navigators
 */
export interface NavigationThemeOptions {
  header: {
    backgroundColor: string
    tintColor: string
    titleColor: string
  }
  tabBar: {
    backgroundColor: string
    activeTintColor: string
    inactiveTintColor: string
  }
  statusBar: {
    barStyle: 'light-content' | 'dark-content'
    backgroundColor: string
  }
}

/**
 * useNavigationTheme
 * Custom hook that provides theme-aware navigation styling options.
 * Returns colors and styles that automatically adapt to light/dark theme changes.
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

  return {
    header: {
      backgroundColor: theme.screen.background.default,
      tintColor: theme.text.link,
      titleColor: theme.text.default,
    },
    tabBar: {
      backgroundColor: theme.screen.background.default,
      activeTintColor: theme.text.link,
      inactiveTintColor: theme.text.secondary,
    },
    statusBar: {
      // Light content (white) for dark theme, dark content (black) for light theme
      barStyle: theme.text.default === '#FFFFFF' ? 'light-content' : 'dark-content',
      backgroundColor: theme.screen.background.default,
    },
  }
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
  navTheme: NavigationThemeOptions
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
 * @returns {BottomTabNavigationOptions} Tab navigator screen options
 *
 * @example
 * ```tsx
 * const navTheme = useNavigationTheme()
 * <Tab.Navigator screenOptions={getTabNavigatorOptions(navTheme)} />
 * ```
 */
export const getTabNavigatorOptions = (
  navTheme: NavigationThemeOptions
): BottomTabNavigationOptions => ({
  headerStyle: {
    backgroundColor: navTheme.header.backgroundColor,
  },
  headerTintColor: navTheme.header.tintColor,
  headerTitleStyle: {
    color: navTheme.header.titleColor,
  },
  tabBarStyle: {
    backgroundColor: navTheme.tabBar.backgroundColor,
  },
  tabBarActiveTintColor: navTheme.tabBar.activeTintColor,
  tabBarInactiveTintColor: navTheme.tabBar.inactiveTintColor,
})
