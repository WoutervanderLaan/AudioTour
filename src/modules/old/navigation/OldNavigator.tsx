import type React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {tabs} from './routes'

const Tab = createBottomTabNavigator()

/**
 * Tabs component that renders the main bottom tab navigation.
 * Contains the primary app screens: Capture, Museum, and Recommendations.
 *
 * @returns The bottom tab navigator component
 */
export const Tabs = (): React.JSX.Element => {
  return (
    <Tab.Navigator screenOptions={{headerShown: true}}>
      {tabs.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.screen}
        />
      ))}
    </Tab.Navigator>
  )
}
