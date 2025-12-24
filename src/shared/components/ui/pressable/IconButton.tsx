import type React from 'react'
import {StyleSheet, useUnistyles} from 'react-native-unistyles'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import {PressableBase, type PressableBaseProps} from './PressableBase'

import type {IconName} from '@/core/navigation/types'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * IconButtonSize
 * Size variants for the IconButton component
 */
export type IconButtonSize = 'sm' | 'md' | 'lg'

/**
 * IconButtonProps
 * Props for the IconButton component
 */
export type IconButtonProps = Omit<
  PressableBaseProps,
  'style' | 'children' | 'testID'
> &
  TestProps<'IconButton'> & {
    /**
     * name - The icon name from MaterialIcons
     */
    name: IconName
    /**
     * size - The size variant of the icon button
     */
    size?: IconButtonSize
    /**
     * color - Optional color override for the icon
     */
    color?: string
  }

const ICON_SIZES: Record<IconButtonSize, number> = {
  sm: 20,
  md: 24,
  lg: 32,
}

/**
 * IconButton
 * A pressable icon button component for navigation and actions.
 * Commonly used in headers for profile, settings, or menu buttons.
 *
 * @param {IconButtonProps} props - Component props
 * @returns {React.JSX.Element} Rendered icon button element
 */
export const IconButton = ({
  name,
  size = 'md',
  color,
  disabled,
  testID,
  ...rest
}: IconButtonProps): React.JSX.Element => {
  const {theme} = useUnistyles()
  const iconColor = color ?? theme.color.pressable.primary.default.background

  return (
    <PressableBase
      testID={`${testID}Pressable` as `${string}Pressable`}
      disabled={disabled}
      style={({pressed}) => [
        styles.base,
        styles[size],
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      {...rest}>
      <MaterialIcons
        name={name}
        size={ICON_SIZES[size]}
        color={iconColor}
      />
    </PressableBase>
  )
}

const styles = StyleSheet.create(theme => ({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.size.md,
  },
  sm: {
    padding: theme.size.xs,
  },
  md: {
    padding: theme.size.sm,
  },
  lg: {
    padding: theme.size.md,
  },
  pressed: {
    opacity: theme.opacity.pressed,
  },
  disabled: {
    opacity: theme.opacity.disabled,
  },
}))
