import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import {Box} from '../layout/Box'
import {Column} from '../layout/Column'
import {Row} from '../layout/Row'
import {PressableBase} from '../pressable/PressableBase'
import {Text} from '../typography'

import type {TestProps} from '@/shared/types/TestProps'

/**
 * RadioOption
 * Type definition for a single radio option
 */
export type RadioOption<T extends string = string> = {
  /**
   * value - Unique identifier for the option
   */
  value: T
  /**
   * label - Display text for the option
   */
  label: string
  /**
   * description - Optional description text
   */
  description?: string
  /**
   * disabled - Whether this option is disabled
   */
  disabled?: boolean
}

/**
 * RadioGroupProps
 * Props for the RadioGroup component
 */
export type RadioGroupProps<T extends string = string> =
  TestProps<'RadioGroup'> & {
    /**
     * options - Array of options to display
     */
    options: RadioOption<T>[]
    /**
     * value - Currently selected value
     */
    value?: T
    /**
     * onChange - Callback when selection changes
     */
    onChange?: (value: T) => void
    /**
     * disabled - Whether the entire group is disabled
     */
    disabled?: boolean
    /**
     * hasError - Whether there is an error (for styling)
     */
    hasError?: boolean
  }

/**
 * RadioIndicator
 * Renders the radio button indicator (outer circle and inner dot)
 *
 * @param {object} props - Component props
 * @param {boolean} props.selected - Whether this option is selected
 * @param {boolean} props.disabled - Whether this option is disabled
 * @param {boolean} props.hasError - Whether there's an error
 * @returns {React.JSX.Element} Rendered radio indicator
 */
const RadioIndicator = ({
  selected,
  disabled,
  hasError,
  testID,
}: {
  selected: boolean
  disabled: boolean
  hasError: boolean
  testID: RadioGroupProps['testID']
}): React.JSX.Element => (
  <Box
    testID={`${testID}RadioIndicatorBox`}
    center
    style={[
      styles.radioCircle,
      hasError && styles.radioCircleError,
      disabled && styles.radioCircleDisabled,
    ]}>
    {!!selected && (
      <Box
        testID={`${testID}RadioIndicatorInnerBox`}
        style={styles.radioInner}
      />
    )}
  </Box>
)

/**
 * RadioGroup
 * Pure radio button group component for selecting one option from multiple choices.
 * This is a pure component that should be wrapped with FormField for label, error, and help text functionality.
 *
 * Features:
 * - Single selection from multiple options
 * - Theme-based styling
 * - Error state visualization
 * - Individual option descriptions
 * - Keyboard accessible
 *
 * Usage with FormField:
 * ```tsx
 * <FormField
 *   label="Select an option"
 *   error={errors.option}
 *   hint="Choose your preferred option"
 * >
 *   <RadioGroup
 *     options={options}
 *     value={selectedValue}
 *     onChange={setSelectedValue}
 *   />
 * </FormField>
 * ```
 *
 * @param {RadioGroupProps<T>} props - Component props
 * @returns {React.JSX.Element} Rendered radio group
 */
export const RadioGroup = <T extends string = string>({
  options,
  value,
  onChange,
  disabled = false,
  hasError = false,
  testID,
}: RadioGroupProps<T>): React.JSX.Element => {
  /**
   * handleSelect
   * Handles selection of a radio option
   *
   * @param {T} optionValue - The value of the selected option
   */
  const handleSelect = (optionValue: T): void => {
    if (disabled) {
      return
    }
    onChange?.(optionValue)
  }

  return (
    <Column
      gap="xs"
      stretch
      testID={`${testID}ContainerColumn`}>
      {options.map(option => {
        const isSelected = value === option.value
        const isDisabled = disabled || option.disabled

        return (
          <PressableBase
            key={option.value}
            testID={`${testID}Option${option.value}Pressable`}
            onPress={() => handleSelect(option.value)}
            disabled={isDisabled}
            accessibilityRole="radio"
            accessibilityState={{
              selected: isSelected,
              disabled: isDisabled,
            }}>
            <Row
              style={styles.optionContainer}
              testID={`${testID}Option${option.value}Row`}
              gap="sm"
              padding="sm">
              <RadioIndicator
                selected={isSelected}
                disabled={!!isDisabled}
                hasError={hasError}
                testID={testID}
              />
              <Column testID={`${testID}Option${option.value}Column`}>
                <Text.Label
                  testID={`${testID}Option${option.value}LabelText`}
                  color={isDisabled ? 'secondary' : 'default'}>
                  {option.label}
                </Text.Label>
                {!!option.description && (
                  <Text.Paragraph
                    testID={`${testID}Option${option.value}DescriptionText`}
                    variant="extraSmall"
                    color="secondary">
                    {option.description}
                  </Text.Paragraph>
                )}
              </Column>
            </Row>
          </PressableBase>
        )
      })}
    </Column>
  )
}

const RADIO_SIZE = 24
const RADIO_INNER_SIZE = 12

const styles = StyleSheet.create(theme => ({
  optionContainer: {
    ...theme.styles.border.sharp,
  },
  radioCircle: {
    width: RADIO_SIZE,
    height: RADIO_SIZE,
    ...theme.styles.border.thick,
    borderColor: theme.color.text.tertiary,
  },
  radioCircleError: {
    borderColor: theme.color.text.warning,
  },
  radioCircleDisabled: {
    opacity: theme.opacity.disabled,
  },
  radioInner: {
    width: RADIO_INNER_SIZE,
    height: RADIO_INNER_SIZE,
    borderRadius: RADIO_INNER_SIZE,
    backgroundColor: theme.color.pressable.primary.default.background,
  },
}))
