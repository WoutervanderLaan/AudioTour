import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {routes} from './routes'

const Stack = createNativeStackNavigator()

/**
 * AuthNavigator
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const AuthNavigator = (): React.JSX.Element => {
  return (
    <Stack.Navigator screenOptions={{}}>
      {routes.map(route => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          component={route.screen}
          options={route.options}
        />
      ))}
    </Stack.Navigator>
  )
}
