import type React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {tabs} from './routes'

import type {HomeTabsParamList} from '@/core/navigation/types'
import {
  getTabNavigatorOptions,
  useNavigationTheme,
} from '@/shared/hooks/useNavigationTheme'

const Tab = createBottomTabNavigator<HomeTabsParamList>()

/**
 * Tabs component that renders the main bottom tab navigation.
 * Contains the primary app screens: Capture, Museum, and Recommendations.
 * Automatically adapts header and tab bar styling to the current theme (light/dark).
 *
 * @returns The bottom tab navigator component with dynamic theme-aware styling
 */
export const Tabs = (): React.JSX.Element => {
  const navTheme = useNavigationTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        ...getTabNavigatorOptions(navTheme),
      }}>
      {tabs.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name as keyof HomeTabsParamList}
          component={tab.screen}
        />
      ))}
    </Tab.Navigator>
  )
}
