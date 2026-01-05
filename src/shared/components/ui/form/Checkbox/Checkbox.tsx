import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import type {CheckboxLabelProps, CheckboxProps} from './Checkbox.types'

import {Box} from '@/shared/components/ui/layout/Box'
import {Row} from '@/shared/components/ui/layout/Row'
import {PressableBase} from '@/shared/components/ui/pressable/PressableBase'
import {Text} from '@/shared/components/ui/typography/Text'

/**
 * CHECKBOX_SIZE
 * Size of the checkbox box in points
 */
const CHECKBOX_SIZE = 24

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
