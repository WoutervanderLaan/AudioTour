import {Text} from '@react-navigation/elements'
import {View} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

/**
 * Settings
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export function Settings(): any {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create(() => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
}))
