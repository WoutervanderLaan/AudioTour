import type React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {moduleRegistry} from './ModuleRegistry'
import type {HomeTabsParamList} from './types'

import {
  getTabNavigatorOptions,
  useNavigationTheme,
} from '@/shared/hooks/useNavigationTheme'

const Tab = createBottomTabNavigator<HomeTabsParamList>()

/**
 * Dynamic TabNavigator component that gathers tab routes from all registered modules.
 * This replaces the hardcoded tab navigator and allows modules to define their own tab screens.
 * Automatically adapts header and tab bar styling to the current theme (light/dark).
 *
 * @returns The bottom tab navigator component with dynamically gathered tabs from all modules
 */
export const TabNavigator = (): React.JSX.Element => {
  const navTheme = useNavigationTheme()
  const tabRoutes = moduleRegistry.getTabRoutes()

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
