import React from 'react'
import {Text, View} from 'react-native'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {moduleRegistry} from './ModuleRegistry'
import type {HomeTabsParamList} from './types'

import {logger} from '@/core/lib/logger'
import {
  getTabNavigatorOptions,
  useNavigationTheme,
} from '@/shared/hooks/useNavigationTheme'

const Tab = createBottomTabNavigator<HomeTabsParamList>()

/**
 * Fallback component displayed when no tab routes are registered.
 * This should never happen in production but provides a helpful error message during development.
 *
 * @returns A simple error message component
 */
const NoTabsScreen = (): React.JSX.Element => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>No tab routes registered. Please add routes with type: 'tab' to your modules.</Text>
  </View>
)

/**
 * Dynamic TabNavigator component that gathers tab routes from all registered modules.
 * This replaces the hardcoded tab navigator and allows modules to define their own tab screens.
 * Automatically adapts header and tab bar styling to the current theme (light/dark).
 *
 * The component memoizes the tab routes to avoid unnecessary recalculations and includes
 * error handling for the edge case where no tab routes are registered.
 *
 * @returns The bottom tab navigator component with dynamically gathered tabs from all modules
 */
export const TabNavigator = (): React.JSX.Element => {
  const navTheme = useNavigationTheme()

  // Memoize tab routes to prevent unnecessary filtering on every render
  const tabRoutes = React.useMemo(() => {
    const routes = moduleRegistry.getTabRoutes()

    // Log warning if no tab routes are found (development aid)
    if (routes.length === 0) {
      logger.warn('No tab routes registered in any module')
    }

    return routes
  }, [])

  // Handle edge case of no tab routes (fallback UI)
  if (tabRoutes.length === 0) {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          ...getTabNavigatorOptions(navTheme),
        }}>
        <Tab.Screen
          name="NoTabs"
          component={NoTabsScreen}
          options={{title: 'Error'}}
        />
      </Tab.Navigator>
    )
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        ...getTabNavigatorOptions(navTheme),
      }}>
      {tabRoutes.map(route => (
        <Tab.Screen
          key={route.name}
          name={route.name as keyof HomeTabsParamList}
          component={route.screen}
          options={route.options}
        />
      ))}
    </Tab.Navigator>
  )
}
