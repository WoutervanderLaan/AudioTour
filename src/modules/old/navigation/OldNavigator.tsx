import type React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {tabs} from './routes'

import type {HomeTabsParamList} from '@/shared/navigation/types'

const Tab = createBottomTabNavigator<HomeTabsParamList>()

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
          name={tab.name as keyof HomeTabsParamList}
          component={tab.screen}
        />
      ))}
    </Tab.Navigator>
  )
}
