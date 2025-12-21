import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import {Column} from '@/shared/components/ui/layout/Column'
import {
  PressableBase,
  type PressableBaseProps,
} from '@/shared/components/ui/pressable/PressableBase'
import {Text} from '@/shared/components/ui/typography'

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
} & Omit<PressableBaseProps, 'style'>

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
  ...pressableProps
}: AddPhotoProps): React.JSX.Element => (
  <PressableBase
    onPress={onPress}
    {...pressableProps}>
    <Column
      center
      style={[styles.container, styles[size]]}>
      <Text.Title>+</Text.Title>
    </Column>
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
    borderWidth: theme.size.xxs,
    borderColor: theme.color.text.secondary,
    borderStyle: 'dashed',
  },
}))
