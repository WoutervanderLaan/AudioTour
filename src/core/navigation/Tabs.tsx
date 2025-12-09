import React, {useMemo} from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {moduleRegistry} from './ModuleRegistry'
import {type RootStackParams} from './types'

import {
  getTabNavigatorOptions,
  useNavigationTheme,
} from '@/shared/hooks/useNavigationTheme'

const Tab = createBottomTabNavigator<RootStackParams>()

/**
 * Tabs component renders the bottom tab navigator with all module tab screens.
 * Tab screens are collected from all registered modules via moduleRegistry.getTabs().
 *
 * @returns Tab navigator with all registered tab screens
 */
export const Tabs = (): React.JSX.Element => {
  const navTheme = useNavigationTheme()

  const bottomTabs = useMemo(
    () =>
      Object.entries(moduleRegistry.getTabs()).map(([key, route]) => (
        <Tab.Screen
          key={key}
          {...route}
        />
      )),
    [],
  )

  return (
    <Tab.Navigator screenOptions={getTabNavigatorOptions(navTheme)}>
      {bottomTabs}
    </Tab.Navigator>
  )
}
