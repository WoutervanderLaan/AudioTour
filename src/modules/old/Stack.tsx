import type React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {OldRouteName} from './routes.types'
import {oldStacks} from './screenConfig'

import {RootStackParams} from '@/core/navigation/types'
import {
  getStackNavigatorOptions,
  useNavigationTheme,
} from '@/shared/hooks/useNavigationTheme'

const Stack = createNativeStackNavigator<RootStackParams>()

/**
 * OldStack - Legacy module stack navigator (no longer used).
 * Replaced by direct registration of screens in the root navigator.
 *
 * @deprecated This component is no longer used in the new navigation architecture
 * @returns Old module stack navigator component
 */
export const OldStack = (): React.JSX.Element => {
  const navTheme = useNavigationTheme()

  return (
    <Stack.Navigator
      initialRouteName={OldRouteName.narrative}
      screenOptions={getStackNavigatorOptions(navTheme)}>
      <Stack.Group>
        {Object.entries(oldStacks).map(([key, route]) => (
          <Stack.Screen
            key={key}
            {...route}
          />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  )
}
