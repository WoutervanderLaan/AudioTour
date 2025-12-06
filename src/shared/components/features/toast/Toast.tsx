import type React from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {StyleSheet} from 'react-native-unistyles'

import {Box} from '@/shared/components/ui/layout/Box'
import {Label} from '@/shared/components/ui/typography'
import {Z_INDEX} from '@/shared/constants/ui'

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}
/**
 * Props
 * Component props for the Toast notification component including message content and visual type.
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
 * Displays a temporary notification message at the top of the screen with different visual styles based on type.
 *
 * @param props - Component props including message and type
 * @returns Toast notification component
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
    zIndex: Z_INDEX.TOAST,
    backgroundColor: color.screen.background.default,
  },

  success: {borderColor: '#4BB543', borderWidth: 1},
  error: {borderColor: '#FF3333', borderWidth: 1},
  info: {borderColor: '#5f5f5f', borderWidth: 1},
}))
