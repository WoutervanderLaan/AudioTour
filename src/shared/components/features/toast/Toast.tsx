import type React from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {StyleSheet} from 'react-native-unistyles'

import {Box} from '@/shared/components/ui/layout/Box'
import {Text} from '@/shared/components/ui/typography'
import type {TestProps} from '@/shared/types/TestProps'

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}
/**
 * Props
 * Component props for the Toast notification component including message content and visual type.
 */
type Props = Readonly<
  TestProps<'Toast'> & {
    /**
     * message
     */
    message: string
    /**
     * type
     */
    type?: ToastType
  }
>

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
  testID,
}: Props): React.JSX.Element => {
  const {top} = useSafeAreaInsets()

  return (
    <Box
      testID={`${testID}ContainerBox`}
      padding="md"
      style={styles.absolute}>
      <Box
        testID={`${testID}InnerBox`}
        style={[styles.toast, styles[type], {top: top + 20}]}
        center
        padding="md">
        <Text.Label testID={`${testID}MessageText`}>{message}</Text.Label>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create(theme => ({
  absolute: {
    position: 'absolute',
    zIndex: theme.zIndex.toast,
  },
  toast: {
    backgroundColor: theme.color.screen.background.default,
    borderWidth: theme.size.xxs,
  },

  success: {borderColor: '#4BB543'},
  error: {borderColor: '#FF3333'},
  info: {borderColor: '#5f5f5f'},
}))
