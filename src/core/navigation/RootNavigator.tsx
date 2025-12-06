import React from 'react'

import {
  NavigationContainer,
  NavigationContainerProps,
} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {linking} from './linking'
import {moduleRegistry} from './ModuleRegistry'
import {TabNavigator} from './TabNavigator'
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
 * - HomeTabs: Initial route containing the dynamically generated bottom tab navigator
 * - Module Routes: Stack and modal screens from all modules
 *
 * Modules define their routes with type annotations (tab, stack, modal):
 * - 'tab' routes are gathered and rendered in the TabNavigator (HomeTabs)
 * - 'stack' and 'modal' routes are registered in the root stack navigator
 *
 * This allows modules to be self-contained and define their own navigation structure
 * without modifying central navigation files.
 *
 * @param props - Navigation container props (excluding children)
 * @returns The root navigation container with all module routes registered
 */
export const RootNavigator: React.FC<
  Omit<NavigationContainerProps, 'children'>
> = props => {
  const navTheme = useNavigationTheme()

  // Memoize root stack routes (stack + modal) to prevent unnecessary recalculations
  const rootStackRoutes = React.useMemo(() => {
    return moduleRegistry.getRootStackRoutes()
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
        {/* Main tabs as the initial route - dynamically gathers tab routes from all modules */}
        <Stack.Screen
          name="HomeTabs"
          component={TabNavigator}
          options={{headerShown: false}}
        />

        {/* Register all stack and modal routes from modules */}
        {rootStackRoutes.map(route => (
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
