import type {TestProps} from '@/shared/types/TestProps'

/**
 * CheckboxProps
 * Props for the Checkbox component
 */
export type CheckboxProps = TestProps<'Checkbox'> & {
  /** Accessible label for the checkbox */
  label?: string
  /** Whether the checkbox is disabled */
  disabled?: boolean
  /** Whether the checkbox is required (adds asterisk to label) */
  required?: boolean
  /** Whether the checkbox is checked */
  checked?: boolean
  /** Callback when checkbox state changes */
  onChange?: (checked: boolean) => void
  /** Accessible label override */
  accessibilityLabel?: string
  /** Accessible hint override */
  accessibilityHint?: string
}

/**
 * CheckboxLabelProps
 * Props for the CheckboxLabel component
 */
export type CheckboxLabelProps = {
  /** Text to display in the label */
  label: string
  /** Native ID for the label element */
  labelId: string
  /** Whether the checkbox is disabled */
  disabled: boolean
  /** Whether the field is required */
  required: boolean
  /** Test ID for the label */
  testID: string
}
