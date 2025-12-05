import React from 'react'

import {
  NavigationContainer,
  NavigationContainerProps,
} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {linking} from './linking'
import {moduleRegistry} from './ModuleRegistry'
import type {RootStackParamList} from './types'

import {
  getStackNavigatorOptions,
  useNavigationTheme,
} from '@/shared/hooks/useNavigationTheme'

const Stack = createNativeStackNavigator<RootStackParamList>()

/**
 * RootNavigator component that manages the application's navigation structure.
 * Automatically adapts header styling to the current theme (light/dark).
 *
 * Navigation Architecture:
 * - HomeTabs: Initial route containing the main tab navigator (Capture, Museum, Recommendations)
 * - Module Routes: Additional screens from all modules registered as root stack screens
 *
 * The old module provides:
 * - navigator: The bottom tab navigator (rendered as HomeTabs)
 * - routes: Modal and detail screens (ObjectDetail, Narrative, Settings, NotFound)
 *
 * Other modules can provide additional routes that will be registered in the root stack.
 *
 * @param props - Navigation container props (excluding children)
 * @returns The root navigation container with all module routes registered
 */
export const RootNavigator: React.FC<
  Omit<NavigationContainerProps, 'children'>
> = props => {
  const navTheme = useNavigationTheme()

  // Get the main tabs navigator from the 'old' module
  // Note: This is hardcoded for now but should be made configurable in the future
  const mainModule = React.useMemo(() => {
    const modules = moduleRegistry.getEnabledModules()
    return modules.find(m => m.name === 'old')
  }, [])

  const MainTabs = mainModule?.navigator

  // Memoize routes to prevent unnecessary recalculations
  const allRoutes = React.useMemo(() => {
    return moduleRegistry.getRoutes()
  }, [])

  return (
    <NavigationContainer
      {...props}
      linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...getStackNavigatorOptions(navTheme),
        }}
        initialRouteName="HomeTabs">
        {/* Main tabs as the initial route */}
        {!!MainTabs && (
          <Stack.Screen
            name="HomeTabs"
            component={MainTabs}
            options={{headerShown: false}}
          />
        )}

        {/* Register all module routes as stack screens (no duplicates - HomeTabs is not in routes) */}
        {allRoutes.map(route => (
          <Stack.Screen
            key={route.name}
            name={route.name as keyof RootStackParamList}
            component={route.screen}
            options={route.options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
