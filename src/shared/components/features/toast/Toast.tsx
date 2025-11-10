import {Text, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {StyleSheet} from 'react-native-unistyles'

/**
 * Props
 * TODO: describe what this type represents.
 */
type Props = Readonly<{
  /**
   * message
   */
  message: string
  /**
   * type
   */
  type?: 'success' | 'error' | 'info'
}>

/**
 * Toast
 * TODO: describe what it does.
 *
 * @param {*} options
 * @returns {*} describe return value
 */
export function Toast({message, type = 'info'}: Props) {
  const {top} = useSafeAreaInsets()

  return (
    <View style={[styles.toast, styles[type], {top: top + 20}]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create(({color}) => ({
  toast: {
    position: 'absolute',
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    zIndex: 9999,
    alignItems: 'center',
    backgroundColor: color.screen.background.default,
  },
  text: {
    fontWeight: 'bold',
    color: color.text.default,
  },
  success: {borderColor: '#4BB543', borderWidth: 1},
  error: {borderColor: '#FF3333', borderWidth: 1},
  info: {borderColor: '#5f5f5f', borderWidth: 1},
}))
