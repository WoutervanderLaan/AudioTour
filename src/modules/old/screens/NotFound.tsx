import type React from 'react'
import {View} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {Text} from '@react-navigation/elements'

/**
 * NotFound
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const NotFound = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>404</Text>
      {/* <Button screen="HomeTabs">Go to Home</Button> */}
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
