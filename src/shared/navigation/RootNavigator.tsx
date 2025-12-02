import React from 'react'

import {
  NavigationContainer,
  NavigationContainerProps,
} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {moduleRegistry} from './ModuleRegistry'

const Stack = createNativeStackNavigator()

/**
 * RootNavigator
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const RootNavigator: React.FC<
  Omit<NavigationContainerProps, 'children'>
> = props => {
  const modules = moduleRegistry.getEnabledModules()

  return (
    <NavigationContainer {...props}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {modules.map(module => {
          if (!module.navigator) return null

          return (
            <Stack.Screen
              key={module.name}
              name={module.name}
              component={module.navigator}
            />
          )
        })}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
