import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import {Column} from '@/shared/components/ui/layout/Column'
import {
  PressableBase,
  type PressableBaseProps,
} from '@/shared/components/ui/pressable/PressableBase'
import {Text} from '@/shared/components/ui/typography'

/**
 * AddPhotoProps
 * TODO: describe what this type represents.
 */
type AddPhotoProps = {
  size?: 'sm' | 'md' | 'lg'
} & Omit<PressableBaseProps, 'style'>

/**
 * AddPhoto
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
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
    width: 60,
    height: 60,
    borderRadius: theme.size.sm,
  },
  md: {
    width: 100,
    height: 100,
    borderRadius: theme.size.md,
  },
  lg: {
    width: 140,
    height: 140,
    borderRadius: theme.size.lg,
  },
  container: {
    borderWidth: 2,
    borderColor: theme.color.text.secondary,
    borderStyle: 'dashed',
  },
}))
