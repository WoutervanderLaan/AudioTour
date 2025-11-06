import {Text} from '@react-navigation/elements'
import {StyleSheet, View} from 'react-native'

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
})
