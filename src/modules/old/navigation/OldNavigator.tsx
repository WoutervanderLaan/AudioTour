import type React from 'react'

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {tabs} from './routes'

const Tab = createBottomTabNavigator()

/**
 * HomeTabs
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
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

// const RootStack = createNativeStackNavigator({
//   screens: {
//     HomeTabs: {
//       screen: HomeTabs,
//       options: {
//         title: 'Home',
//         headerShown: false,
//       },
//     },
//     ObjectDetail: {
//       screen: ObjectDetail,
//     },
//     Narrative: {
//       screen: Narrative,
//     },
//     Settings: {
//       screen: Settings,
//       options: ({navigation}) => ({
//         presentation: 'modal',
//         headerRight: (): React.JSX.Element => (
//           <HeaderButton onPress={navigation.goBack}>
//             <Text>Close</Text>
//           </HeaderButton>
//         ),
//       }),
//     },
//     NotFound: {
//       screen: NotFound,
//       options: {
//         title: '404',
//       },
//       linking: {
//         path: '*',
//       },
//     },
//   },
// })

// export const Navigation = createStaticNavigation(RootStack)

// /**
//  * RootStackParamList
//  * TODO: describe what this type represents.
//  */
// export type RootStackParamList = StaticParamList<typeof RootStack>

// declare global {
//   namespace ReactNavigation {
//     /**
//      * RootParamList
//      * TODO: describe what this type represents.
//      */
//     // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
//     interface RootParamList extends RootStackParamList {}
//   }
// }
