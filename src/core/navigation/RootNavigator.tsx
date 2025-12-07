import React, {useMemo} from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {
  NavigationContainer,
  NavigationContainerProps,
} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {linking} from './linking'
import {moduleRegistry} from './ModuleRegistry'
import type {RootStackParams} from './types'

import {
  getTabNavigatorOptions,
  useNavigationTheme,
} from '@/shared/hooks/useNavigationTheme'

const Stack = createNativeStackNavigator<RootStackParams>()
const Tab = createBottomTabNavigator<RootStackParams>()

/**
 * Tabs component renders the bottom tab navigator with all module tab screens.
 * Tab screens are collected from all registered modules via moduleRegistry.getTabs().
 *
 * @returns Tab navigator with all registered tab screens
 */
const Tabs = (): React.JSX.Element => {
  const navTheme = useNavigationTheme()

  const bottomTabs = useMemo(
    () =>
      Object.entries(moduleRegistry.getTabs()).map(([key, route]) => (
        <Tab.Screen
          key={key}
          {...route}
          options={getTabNavigatorOptions(navTheme)}
        />
      )),
    [navTheme],
  )

  return <Tab.Navigator>{bottomTabs}</Tab.Navigator>
}

/**
 * RootNavigator component that manages the application's navigation structure.
 *
 * Navigation Architecture:
 * - Tabs: Initial route containing the bottom tab navigator with all module tab screens
 * - Stack Screens: Detail screens that appear above tabs (hide tab bar, show back button)
 * - Modals: Full-screen modals with modal presentation
 *
 * Navigation Flow:
 * 1. User starts at a tab screen (e.g., Capture)
 * 2. Navigating to a stack screen (e.g., NotFound) pushes it above the tabs
 * 3. The back button returns to the tab screen
 * 4. Modals appear with modal animation
 *
 * @param props - Navigation container props (excluding children)
 * @returns The root navigation container with all module routes registered
 */
export const RootNavigator: React.FC<
  Omit<NavigationContainerProps, 'children'>
> = props => {
  const stackScreens = useMemo(
    () =>
      Object.entries(moduleRegistry.getStacks()).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
        />
      )),
    [],
  )

  const modalScreens = useMemo(
    () =>
      Object.entries(moduleRegistry.getModals()).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
        />
      )),
    [],
  )

  return (
    <NavigationContainer
      {...props}
      linking={linking}>
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerShown: false}}
        />

        {stackScreens}

        <Stack.Group
          screenOptions={{
            presentation: 'modal',
          }}>
          {modalScreens}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
