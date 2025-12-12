import type React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import {Box} from '../layout/Box'
import {Column} from '../layout/Column'
import {Row} from '../layout/Row'
import {PressableBase} from '../pressable/PressableBase'
import {Text} from '../typography'

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
export type RadioGroupProps<T extends string = string> = {
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
   * label - Label for the entire radio group
   */
  label?: string
  /**
   * error - Error message to display
   */
  error?: string
  /**
   * hint - Helper text to display
   */
  hint?: string
  /**
   * disabled - Whether the entire group is disabled
   */
  disabled?: boolean
  /**
   * required - Whether selection is required
   */
  required?: boolean
  /**
   * testID - Test identifier for automated testing
   */
  testID?: string
}

/**
 * RadioGroupLabel
 * Renders the label for the radio group
 *
 * @param {object} props - Component props
 * @param {string} props.label - Label text
 * @param {boolean} props.required - Whether field is required
 * @param {boolean} props.disabled - Whether field is disabled
 * @returns {React.JSX.Element} Rendered label element
 */
const RadioGroupLabel = ({
  label,
  required,
  disabled,
}: {
  label: string
  required: boolean
  disabled: boolean
}): React.JSX.Element => (
  <Text.Label color={disabled ? 'secondary' : 'default'}>
    {label}
    {!!required && (
      <Text.Label
        color="warning"
        accessibilityLabel="required">
        {' '}
        *
      </Text.Label>
    )}
  </Text.Label>
)

/**
 * HelpText
 * Renders help text or error message
 *
 * @param {object} props - Component props
 * @param {string} props.text - Text to display
 * @param {boolean} props.hasError - Whether this is an error
 * @returns {React.JSX.Element} Rendered help text element
 */
const HelpText = ({
  text,
  hasError,
}: {
  text: string
  hasError: boolean
}): React.JSX.Element => (
  <Text.Label
    color={hasError ? 'warning' : 'secondary'}
    variant="small"
    accessibilityRole="text"
    accessibilityLiveRegion={hasError ? 'polite' : 'none'}>
    {text}
  </Text.Label>
)

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
}: {
  selected: boolean
  disabled: boolean
  hasError: boolean
}): React.JSX.Element => (
  <Box
    style={[
      styles.radioCircle,
      hasError && styles.radioCircleError,
      disabled && styles.radioCircleDisabled,
    ]}>
    {!!selected && <Box style={styles.radioInner} />}
  </Box>
)

/**
 * RadioGroup
 * A group of radio button options where only one can be selected.
 * Typically used for mutually exclusive choices.
 *
 * Features:
 * - Single selection from multiple options
 * - Accessible labels and error messages
 * - Theme-based styling
 * - Error state visualization
 * - Helper text and descriptions
 * - Required field indicator
 * - Individual option descriptions
 * - Keyboard accessible
 *
 * @param {RadioGroupProps<T>} props - Component props
 * @returns {React.JSX.Element} Rendered radio group
 */
export const RadioGroup = <T extends string = string>({
  options,
  value,
  onChange,
  label,
  error,
  hint,
  disabled = false,
  required = false,
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

  const hasError = !!error
  const helpText = error || hint

  return (
    <Column
      gap="sm"
      testID={testID}>
      {!!label && (
        <RadioGroupLabel
          label={label}
          required={required}
          disabled={disabled}
        />
      )}
      <Column gap="xs">
        {options.map(option => {
          const isSelected = value === option.value
          const isDisabled = disabled || option.disabled

          return (
            <PressableBase
              key={option.value}
              onPress={() => handleSelect(option.value)}
              disabled={isDisabled}
              style={({pressed}) => [
                styles.optionContainer({pressed, disabled: !!isDisabled}),
              ]}
              accessibilityRole="radio"
              accessibilityState={{
                selected: isSelected,
                disabled: isDisabled,
              }}>
              <Row
                gap="sm"
                centerY
                flex={1}>
                <RadioIndicator
                  selected={isSelected}
                  disabled={!!isDisabled}
                  hasError={hasError}
                />
                <Column
                  gap="xxs"
                  flex={1}>
                  <Text.Label color={isDisabled ? 'secondary' : 'default'}>
                    {option.label}
                  </Text.Label>
                  {!!option.description && (
                    <Text.Paragraph
                      variant="small"
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
      {!!helpText && (
        <HelpText
          text={helpText}
          hasError={hasError}
        />
      )}
    </Column>
  )
}

const RADIO_SIZE = 24
const RADIO_INNER_SIZE = 12

const styles = StyleSheet.create(theme => ({
  optionContainer: (state: {pressed: boolean; disabled: boolean}): object => ({
    paddingVertical: theme.size.sm,
    paddingHorizontal: theme.size.md,
    borderRadius: theme.size.sm,
    borderWidth: 1,
    borderColor: theme.color.textInput.container.border,
    backgroundColor: state.pressed
      ? theme.color.pressable.secondary.pressed.background
      : theme.color.textInput.container.background,
    opacity: state.disabled ? 0.5 : 1,
  }),
  radioCircle: {
    width: RADIO_SIZE,
    height: RADIO_SIZE,
    borderRadius: RADIO_SIZE / 2,
    borderWidth: 2,
    borderColor: theme.color.text.tertiary,
    backgroundColor: theme.color.textInput.container.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleError: {
    borderColor: theme.color.text.warning,
  },
  radioCircleDisabled: {
    opacity: 0.5,
  },
  radioInner: {
    width: RADIO_INNER_SIZE,
    height: RADIO_INNER_SIZE,
    borderRadius: RADIO_INNER_SIZE / 2,
    backgroundColor: theme.color.pressable.primary.default.background,
  },
}))
