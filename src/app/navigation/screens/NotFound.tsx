import {Button, Text} from '@react-navigation/elements'
import {View} from 'react-native'

import {ThemedStyleSheet} from '@/themes/ThemedStyleSheet'

/**
 * NotFound
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export function NotFound() {
  return (
    <View style={styles.container}>
      <Text>404</Text>
      <Button screen="HomeTabs">Go to Home</Button>
    </View>
  )
}

const styles = ThemedStyleSheet.create(() => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
}))
