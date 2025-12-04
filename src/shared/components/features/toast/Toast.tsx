import type React from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {StyleSheet} from 'react-native-unistyles'

import {Box} from '@/shared/components/ui/layout/Box'
import {Label} from '@/shared/components/ui/typography'

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}
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
  type?: ToastType
}>

/**
 * Toast
 * TODO: describe what it does.
 *
 * @param {*} options
 * @returns {*} describe return value
 */
export const Toast = ({
  message,
  type = ToastType.INFO,
}: Props): React.JSX.Element => {
  const {top} = useSafeAreaInsets()

  return (
    <Box
      style={[styles.toast, styles[type], {top: top + 20}]}
      center
      padding="md">
      <Label>{message}</Label>
    </Box>
  )
}

const styles = StyleSheet.create(({color}) => ({
  toast: {
    position: 'absolute',
    left: 20,
    right: 20,
    elevation: 2,
    zIndex: 9999, //TODO: global constants
    backgroundColor: color.screen.background.default,
  },

  success: {borderColor: '#4BB543', borderWidth: 1},
  error: {borderColor: '#FF3333', borderWidth: 1},
  info: {borderColor: '#5f5f5f', borderWidth: 1},
}))
