import React from 'react'

import {
  NavigationContainer,
  NavigationContainerProps,
} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {linking} from './linking'
import {moduleRegistry} from './ModuleRegistry'
import type {RootStackParams} from './types'

import {ModuleSlug} from '@/modules/slugs'
import {
  getStackNavigatorOptions,
  useNavigationTheme,
} from '@/shared/hooks/useNavigationTheme'

const Stack = createNativeStackNavigator<RootStackParams>()

const moduleStacks = Object.entries(moduleRegistry.getModules()).map(
  ([name, module]) => {
    if (!module.navigator) {
      return null
    }

    return (
      <Stack.Screen
        component={module.navigator}
        key={name}
        name={name as ModuleSlug}
        // options={options}
      />
    )
  },
)

const modalStacks = Object.entries(moduleRegistry.getModals()).map(
  ([key, route]) => (
    <Stack.Screen
      key={key}
      {...route}
    />
  ),
)

/**
 * RootNavigator component that manages the application's navigation structure.
 * Automatically adapts header styling to the current theme (light/dark).
 *
 * Navigation Architecture:
 * - HomeTabs: Initial route containing the main tab navigator (Capture, Museum, Recommendations)
 * - Module Routes: Additional screens from all modules registered as root stack screens
 *
 * The old module provides:
 * - navigator: The bottom tab navigator (rendered as HomeTabs)
 * - routes: Modal and detail screens (ObjectDetail, Narrative, Settings, NotFound)
 *
 * Other modules can provide additional routes that will be registered in the root stack.
 *
 * @param props - Navigation container props (excluding children)
 * @returns The root navigation container with all module routes registered
 */
export const RootNavigator: React.FC<
  Omit<NavigationContainerProps, 'children'>
> = props => {
  const navTheme = useNavigationTheme()

  return (
    <NavigationContainer
      {...props}
      linking={linking}>
      <Stack.Navigator
        initialRouteName={ModuleSlug.old}
        screenOptions={{
          headerShown: false,
          ...getStackNavigatorOptions(navTheme),
        }}>
        {moduleStacks}

        <Stack.Group
          screenOptions={{
            presentation: 'modal',
          }}>
          {modalStacks}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
