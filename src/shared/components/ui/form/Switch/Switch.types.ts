import type {SwitchProps as RNSwitchProps} from 'react-native'

import type {TestProps} from '@/shared/types/TestProps'

/**
 * SwitchProps
 * Props for the Switch component
 */
export type SwitchProps = Omit<
  RNSwitchProps,
  'value' | 'onValueChange' | 'onChange' | 'testID'
> &
  TestProps<'Switch'> & {
    /** Accessible label for the switch */
    label?: string
    /** Whether the switch is disabled */
    disabled?: boolean
    /** Whether the switch is required (adds asterisk to label) */
    required?: boolean
    /** Whether the switch has an error (for styling) */
    hasError?: boolean
    /** Whether the switch is on (controlled) */
    value?: boolean
    /** Callback when switch state changes */
    onChange?: (value: boolean) => void
    /** Accessible label override */
    accessibilityLabel?: string
    /** Accessible hint override */
    accessibilityHint?: string
  }

/**
 * SwitchLabelProps
 * Props for the SwitchLabel component
 */
export type SwitchLabelProps = {
  /** Text to display in the label */
  label: string
  /** Native ID for the label element */
  labelId: string
  /** Whether the switch is disabled */
  disabled: boolean
  /** Whether the field is required */
  required: boolean
  /**
   * testID
   */
  testID: SwitchProps['testID']
}
