import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {routes} from './routes'

const Stack = createNativeStackNavigator()

/**
 * AuthNavigator component that handles authentication-related screens.
 * Provides navigation between Login and Register screens.
 *
 * @returns The authentication stack navigator component
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
