import type React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {OldRouteName} from './routes'
import {screenConfig} from './screenConfig'

import {RootStackParams} from '@/core/navigation/types'
import {
  getStackNavigatorOptions,
  useNavigationTheme,
} from '@/shared/hooks/useNavigationTheme'

const Stack = createNativeStackNavigator<RootStackParams>()

/**
 * OldStack
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const OldStack = (): React.JSX.Element => {
  const navTheme = useNavigationTheme()

  return (
    <Stack.Navigator
      initialRouteName={OldRouteName.capture}
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
