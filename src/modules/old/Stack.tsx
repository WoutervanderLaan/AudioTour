import type React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {OldRouteName} from './routes'
import {screenConfig} from './screenConfig'

import {RootStackParams} from '@/core/navigation/types'

const Stack = createNativeStackNavigator<RootStackParams>()

/**
 * ContactStack
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const OldStack = (): React.JSX.Element => {
  //   const screenOptions = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={OldRouteName.capture}
      screenOptions={undefined}>
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
