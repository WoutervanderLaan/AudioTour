import * as NavigationElements from '@react-navigation/elements'
import {Asset} from 'expo-asset'
import {StatusBar} from 'react-native'
import {UnistylesRuntime} from 'react-native-unistyles'

Asset.loadAsync([...NavigationElements.Assets])

/**
 * Init
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const Init = () => {
  return (
    <StatusBar
      barStyle={
        UnistylesRuntime.colorScheme === 'dark'
          ? 'light-content'
          : 'dark-content'
      }
      animated
    />
  )
}
