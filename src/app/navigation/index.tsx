import type React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {HeaderButton, Text} from '@react-navigation/elements'
import {createStaticNavigation, StaticParamList} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {Capture} from './screens/Capture'
import {Museum} from './screens/Museum'
import {Narrative} from './screens/Narrative'
import {NotFound} from './screens/NotFound'
import {ObjectDetail} from './screens/ObjectDetail'
import {Recommendations} from './screens/Recommendations'
import {Settings} from './screens/Settings'

const HomeTabs = createBottomTabNavigator({
  screens: {
    Capture: {
      screen: Capture,
      options: {
        title: 'Capture',
      },
    },
    Museum: {
      screen: Museum,
      options: {
        title: 'Museum',
      },
    },
    Recommendations: {
      screen: Recommendations,
      options: {
        title: 'For You',
      },
    },
  },
})

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    ObjectDetail: {
      screen: ObjectDetail,
    },
    Narrative: {
      screen: Narrative,
    },
    Settings: {
      screen: Settings,
      options: ({navigation}) => ({
        presentation: 'modal',
        headerRight: (): React.JSX.Element => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
})

export const Navigation = createStaticNavigation(RootStack)

/**
 * RootStackParamList
 * TODO: describe what this type represents.
 */
export type RootStackParamList = StaticParamList<typeof RootStack>

declare global {
  namespace ReactNavigation {
    /**
     * RootParamList
     * TODO: describe what this type represents.
     */
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface RootParamList extends RootStackParamList {}
  }
}
