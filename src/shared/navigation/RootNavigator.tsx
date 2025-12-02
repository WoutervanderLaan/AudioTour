import React from 'react'

import {
  NavigationContainer,
  NavigationContainerProps,
} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {linking} from './linking'
import {moduleRegistry} from './ModuleRegistry'

const Stack = createNativeStackNavigator()

/**
 * RootNavigator component that manages the application's navigation structure.
 * It dynamically constructs the navigation tree from registered modules, with the
 * 'old' module serving as the initial route (main tabs). Other module routes are
 * added as additional screens in the root stack.
 *
 * @param props - Navigation container props (excluding children)
 * @returns The root navigation container with all module routes registered
 */
export const RootNavigator: React.FC<
  Omit<NavigationContainerProps, 'children'>
> = props => {
  const modules = moduleRegistry.getEnabledModules()

  // Get the old module as the main tabs navigator
  const oldModule = modules.find(m => m.name === 'old')
  const MainTabs = oldModule?.navigator

  // Get all routes from all modules
  const allRoutes = moduleRegistry.getRoutes()

  return (
    <NavigationContainer {...props} linking={linking}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="HomeTabs">
        {/* Main tabs as the initial route */}
        {MainTabs && (
          <Stack.Screen
            name="HomeTabs"
            component={MainTabs}
            options={{headerShown: false}}
          />
        )}

        {/* Register all module routes as screens */}
        {allRoutes.map(route => (
          <Stack.Screen
            key={route.name}
            name={route.name}
            component={route.screen}
            options={route.options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
