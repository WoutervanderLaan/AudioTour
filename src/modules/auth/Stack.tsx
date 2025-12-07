import type React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {AuthRouteName} from './routes.types'
import {authStacks} from './screenConfig'

import type {RootStackParams} from '@/core/navigation/types'
import {
  getStackNavigatorOptions,
  useNavigationTheme,
} from '@/shared/hooks/useNavigationTheme'

const Stack = createNativeStackNavigator<RootStackParams>()

/**
 * AuthStack - Legacy authentication stack navigator (no longer used).
 * Replaced by direct registration of screens in the root navigator.
 *
 * @deprecated This component is no longer used in the new navigation architecture
 * @returns Auth stack navigator component
 */
export const AuthStack = (): React.JSX.Element => {
  const navTheme = useNavigationTheme()

  return (
    <Stack.Navigator
      initialRouteName={AuthRouteName.login}
      screenOptions={getStackNavigatorOptions(navTheme)}>
      <Stack.Group>
        {Object.entries(authStacks).map(([key, route]) => (
          <Stack.Screen
            key={key}
            {...route}
          />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  )
}
