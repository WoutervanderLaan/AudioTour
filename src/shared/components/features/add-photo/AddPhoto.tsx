import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import {Box} from '@/shared/components/ui/layout/Box/Box'
import {PressableBase} from '@/shared/components/ui/pressable/PressableBase/PressableBase'
import type {PressableBaseProps} from '@/shared/components/ui/pressable/PressableBase/PressableBase.types'
import {Text} from '@/shared/components/ui/typography/Text'
import type {TestProps} from '@/shared/types/TestProps'

enum AddPhotoSize {
  small = 60,
  medium = 100,
  large = 140,
}
/**
 * AddPhotoProps
 * Props for the AddPhoto component.
 * Extends PressableBaseProps with size options, excluding style prop.
 */
type AddPhotoProps = {
  /**
   * Size variant for the add photo button (default: 'md')
   */
  size?: 'sm' | 'md' | 'lg'
} & Omit<PressableBaseProps, 'style' | 'testID'> &
  TestProps<'AddPhoto'>

/**
 * AddPhoto
 * Pressable button component for adding new photos.
 * Displays a dashed border square with a '+' symbol.
 * Supports three size variants (sm: 60px, md: 100px, lg: 140px).
 *
 * @param props - Component props including onPress handler and size
 * @returns Pressable add photo button component
 */
export const AddPhoto = ({
  onPress,
  size = 'md',
  testID,
  ...pressableProps
}: AddPhotoProps): React.JSX.Element => (
  <PressableBase
    testID={`${testID}ContainerPressable`}
    onPress={onPress}
    {...pressableProps}>
    <Box
      testID={`${testID}PaddingBox`}
      center
      style={[styles.container, styles[size]]}>
      <Text.Title testID={`${testID}Text`}>+</Text.Title>
    </Box>
  </PressableBase>
)

const styles = StyleSheet.create(theme => ({
  sm: {
    width: AddPhotoSize.small,
    height: AddPhotoSize.small,
    borderRadius: theme.size.sm,
  },
  md: {
    width: AddPhotoSize.medium,
    height: AddPhotoSize.medium,
    borderRadius: theme.size.md,
  },
  lg: {
    width: AddPhotoSize.large,
    height: AddPhotoSize.large,
    borderRadius: theme.size.lg,
  },
  container: {
    ...theme.styles.border.default,
    borderColor: theme.color.text.default,
    borderStyle: 'dashed',
  },
}))
