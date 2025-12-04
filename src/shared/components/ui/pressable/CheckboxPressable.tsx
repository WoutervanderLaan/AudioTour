import type React from 'react'

import {PressableBase, type PressableBaseProps} from './PressableBase'

/**
 * CheckboxPressableProps
 * Props for the CheckboxPressable component
 */
export type CheckboxPressableProps = PressableBaseProps

/**
 * CheckboxPressable
 * Pressable component specifically designed for checkbox form controls.
 * Extends PressableBase with checkbox-specific accessibility defaults.
 *
 * @param {CheckboxPressableProps} props - Component props
 * @returns {React.JSX.Element} Rendered pressable element
 */
export const CheckboxPressable = ({
  accessible = true,
  accessibilityRole = 'checkbox',
  ...rest
}: CheckboxPressableProps): React.JSX.Element => (
  <PressableBase
    accessible={accessible}
    accessibilityRole={accessibilityRole}
    {...rest}
  />
)
