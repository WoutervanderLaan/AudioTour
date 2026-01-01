import type React from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {StyleSheet} from 'react-native-unistyles'

import {Box} from '@/shared/components/ui/layout/Box'
import {Text} from '@/shared/components/ui/typography/Text'
import type {ToastProps} from '@/shared/context/toast/ToastContext.types'
import type {TestProps} from '@/shared/types/TestProps'

export enum ToastType {
  SUCCESS = 'success',
  WARNING = 'warning',
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
      testID={`${testID}Container`}
      padding="md"
      style={styles.container}>
      <Box
        testID={`${testID}InnerBox`}
        style={[styles.toast(type), {top: top + 20}]}
        center
        padding="md">
        <Text.Label
          style={styles.text(type)}
          testID={`${testID}MessageText`}>
          {message}
        </Text.Label>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create(theme => ({
  container: {
    position: 'absolute',
    zIndex: theme.zIndex.toast,
    left: 0,
    right: 0,
    ...theme.styles.shadow.md,
  },
  toast: (type: ToastProps['type'] = ToastType.INFO): object => ({
    backgroundColor: theme.color.toast[type].background,
  }),
  text: (type: ToastProps['type'] = ToastType.INFO): object => ({
    color: theme.color.toast[type].text,
  }),
}))
