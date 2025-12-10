import React, {useMemo} from 'react'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {TAB_BAR_ICON_SIZE} from './constants'
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
          options={{
            tabBarIcon: ({color}) => (
              <MaterialIcons
                color={color}
                size={TAB_BAR_ICON_SIZE}
                name={route.icon}
              />
            ),
            ...route.options,
          }}
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
