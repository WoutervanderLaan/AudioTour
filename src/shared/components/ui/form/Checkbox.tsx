import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import {Row} from '../layout/Row'
import {PressableBase} from '../pressable/PressableBase'

import {Box} from '@/shared/components/ui/layout/Box'
import {Text} from '@/shared/components/ui/typography/Text'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * CHECKBOX_SIZE
 * Size of the checkbox box in points
 */
const CHECKBOX_SIZE = 24

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
type CheckboxLabelProps = {
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

/**
 * CheckboxLabel
 * Renders the label for the checkbox
 *
 * @param {CheckboxLabelProps} props - Component props
 * @returns {React.JSX.Element} Rendered label element
 */
const CheckboxLabel = ({
  label,
  labelId,
  disabled,
  required,
  testID,
}: CheckboxLabelProps): React.JSX.Element => (
  <Text.Label
    testID={`${testID}LabelText`}
    nativeID={labelId}
    color={disabled ? 'secondary' : 'default'}
    accessibilityRole="text">
    {label}
    {!!required && (
      <Text.Label
        testID={`${testID}RequiredText`}
        color="warning"
        accessibilityLabel="required">
        {' '}
        *
      </Text.Label>
    )}
  </Text.Label>
)

/**
 * CheckIndicator
 * Renders the check indicator inside the checkbox when checked.
 * Uses a MaterialIcons checkmark icon for clear visual indication.
 *
 * @returns {React.JSX.Element} Rendered check indicator element
 */
const CheckIndicator = (): React.JSX.Element => (
  <MaterialIcons
    name="check"
    size={18}
    style={styles.checkIndicator}
  />
)

/**
 * CheckboxBox
 * Renders the checkbox box with appropriate styling
 *
 * @param {object} props - Component props
 * @param {string} props.checkboxId - ID for the checkbox element
 * @param {boolean} props.checked - Whether the checkbox is checked
 * @param {string} props.testID - Test ID for the checkbox box
 * @returns {React.JSX.Element} Rendered checkbox box
 */
const CheckboxBox = ({
  checkboxId,
  checked,
  testID,
}: {
  checkboxId: string
  checked: boolean
  testID: string
}): React.JSX.Element => (
  <Box
    testID={`${testID}Container`}
    nativeID={checkboxId}
    center
    style={styles.checkboxBox}>
    {!!checked && <CheckIndicator />}
  </Box>
)

/**
 * Checkbox
 * Pure accessible checkbox component with theme integration.
 * Follows WCAG 2.1 AA standards for accessibility.
 * This component renders a checkbox with an inline label. Wrap with FormField for error/help text.
 *
 * Features:
 * - Accessible inline label
 * - Pressed state visual feedback
 * - Theme-based styling
 * - Error state visualization
 * - Required field indicator
 * - Keyboard accessible
 * - 44x44pt minimum touch target
 *
 * Usage with FormField:
 * ```tsx
 * <FormField
 *   error={errors.terms}
 *   hint="You must accept to continue"
 * >
 *   <Checkbox
 *     label="I accept the terms and conditions"
 *     checked={accepted}
 *     onChange={setAccepted}
 *     required
 *   />
 * </FormField>
 * ```
 *
 * @param {CheckboxProps} props - Component props
 * @returns {React.JSX.Element} Rendered checkbox element
 */
export const Checkbox = ({
  label,
  disabled = false,
  required = false,
  checked = false,
  onChange,
  testID,
  accessibilityLabel,
  accessibilityHint,
}: CheckboxProps): React.JSX.Element => {
  /**
   * handlePress
   * Handles press events for the checkbox
   */
  const handlePress = (): void => {
    if (disabled) {
      return
    }
    onChange?.(!checked)
  }

  const checkboxId = testID || 'checkbox'
  const labelId = `${checkboxId}-label`

  return (
    <PressableBase
      accessible
      accessibilityRole="checkbox"
      testID={`${testID}ContainerPressable`}
      onPress={handlePress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{checked, disabled}}
      accessibilityLabelledBy={labelId}>
      <Row
        testID={`${testID}Row`}
        gap="sm"
        center>
        <CheckboxBox
          checkboxId={checkboxId}
          checked={checked}
          testID={testID}
        />
        {!!label && (
          <CheckboxLabel
            label={label}
            labelId={labelId}
            disabled={disabled}
            required={required}
            testID={testID}
          />
        )}
      </Row>
    </PressableBase>
  )
}

const styles = StyleSheet.create(theme => ({
  checkboxBox: {
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
    ...theme.styles.border.sharp,
    backgroundColor: theme.color.pressable.primary.default.background,
    borderColor: theme.color.pressable.primary.default.background,
  },
  checkIndicator: {
    color: theme.color.pressable.primary.default.label,
  },
}))
