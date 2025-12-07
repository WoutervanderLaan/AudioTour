import type React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {AuthRouteName} from './routes'
import {screenConfig} from './screenConfig'

import type {RootStackParams} from '@/core/navigation/types'
import {
  getStackNavigatorOptions,
  useNavigationTheme,
} from '@/shared/hooks/useNavigationTheme'

const Stack = createNativeStackNavigator<RootStackParams>()

/**
 * AuthStack
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const AuthStack = (): React.JSX.Element => {
  const navTheme = useNavigationTheme()

  return (
    <Stack.Navigator
      initialRouteName={AuthRouteName.login}
      screenOptions={getStackNavigatorOptions(navTheme)}>
      <Stack.Group>
        {Object.entries(screenConfig).map(([key, route]) => (
          <Stack.Screen
            key={key}
            {...route}
          />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  )
}
