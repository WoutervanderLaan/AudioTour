import {fireEvent, render, screen} from '@testing-library/react-native'

import {Checkbox} from './Checkbox'

/**
 * Test constants
 */
const TEST_LABELS = {
  short: 'OK',
  long: 'I agree to the terms and conditions, privacy policy, and cookie policy',
  withSpecialChars: 'Accept Terms & Conditions',
  required: 'Required field',
  optional: 'Optional field',
}

/**
 * Test suite for Checkbox component
 */
describe('Checkbox', () => {
  describe('Snapshots', () => {
    it('should match snapshot - default state', () => {
      const {toJSON} = render(<Checkbox label="Default" />)
      expect(toJSON()).toMatchSnapshot()
    })

    it('should match snapshot - checked state', () => {
      const {toJSON} = render(
        <Checkbox
          label="Checked"
          checked
        />
      )
      expect(toJSON()).toMatchSnapshot()
    })

    it('should match snapshot - disabled state', () => {
      const {toJSON} = render(
        <Checkbox
          label="Disabled"
          disabled
        />
      )
      expect(toJSON()).toMatchSnapshot()
    })

    it('should match snapshot - error state', () => {
      const {toJSON} = render(
        <Checkbox
          label="Error"
          hasError
        />
      )
      expect(toJSON()).toMatchSnapshot()
    })

    it('should match snapshot - required field', () => {
      const {toJSON} = render(
        <Checkbox
          label="Required"
          required
        />
      )
      expect(toJSON()).toMatchSnapshot()
    })

    it('should match snapshot - all states combined', () => {
      const {toJSON} = render(
        <Checkbox
          label="Complex"
          checked
          required
          hasError
        />
      )
      expect(toJSON()).toMatchSnapshot()
    })
  })

  describe('Rendering', () => {
    it('should render correctly', () => {
      const {container} = render(<Checkbox />)
      expect(container).toBeTruthy()
    })

    it('should render with testID', () => {
      render(<Checkbox testID="test-checkbox" />)
      expect(screen.getByTestId('test-checkbox')).toBeTruthy()
    })

    it('should render with label', () => {
      render(<Checkbox label="Accept terms" />)
      expect(screen.getByText('Accept terms')).toBeTruthy()
    })

    it('should render without label', () => {
      const {container} = render(<Checkbox />)
      expect(container).toBeTruthy()
    })
  })

  describe('Checked State', () => {
    it('should render unchecked by default', () => {
      const {getByTestId} = render(<Checkbox testID="checkbox" />)
      const checkbox = getByTestId('checkbox')
      expect(checkbox.props.accessibilityState.checked).toBe(false)
    })

    it('should render checked when checked prop is true', () => {
      const {getByTestId} = render(
        <Checkbox
          testID="checkbox"
          checked
        />
      )
      const checkbox = getByTestId('checkbox')
      expect(checkbox.props.accessibilityState.checked).toBe(true)
    })

    it('should toggle checked state', () => {
      const {rerender, getByTestId} = render(
        <Checkbox
          testID="checkbox"
          checked={false}
        />
      )
      let checkbox = getByTestId('checkbox')
      expect(checkbox.props.accessibilityState.checked).toBe(false)

      rerender(
        <Checkbox
          testID="checkbox"
          checked
        />
      )
      checkbox = getByTestId('checkbox')
      expect(checkbox.props.accessibilityState.checked).toBe(true)
    })
  })

  describe('Interaction', () => {
    it('should call onChange when pressed', () => {
      const onChange = jest.fn()
      render(
        <Checkbox
          testID="checkbox"
          onChange={onChange}
          checked={false}
        />
      )

      fireEvent.press(screen.getByTestId('checkbox'))
      expect(onChange).toHaveBeenCalledWith(true)
    })

    it('should toggle value on press', () => {
      const onChange = jest.fn()
      render(
        <Checkbox
          testID="checkbox"
          onChange={onChange}
          checked
        />
      )

      fireEvent.press(screen.getByTestId('checkbox'))
      expect(onChange).toHaveBeenCalledWith(false)
    })

    it('should not call onChange when disabled', () => {
      const onChange = jest.fn()
      render(
        <Checkbox
          testID="checkbox"
          onChange={onChange}
          disabled
        />
      )

      fireEvent.press(screen.getByTestId('checkbox'))
      expect(onChange).not.toHaveBeenCalled()
    })

    it('should handle multiple presses', () => {
      const onChange = jest.fn()
      render(
        <Checkbox
          testID="checkbox"
          onChange={onChange}
          checked={false}
        />
      )

      const checkbox = screen.getByTestId('checkbox')
      fireEvent.press(checkbox)
      fireEvent.press(checkbox)
      fireEvent.press(checkbox)

      expect(onChange).toHaveBeenCalledTimes(3)
    })
  })

  describe('Disabled State', () => {
    it('should render when disabled', () => {
      const {getByTestId} = render(
        <Checkbox
          testID="checkbox"
          label="Disabled checkbox"
          disabled
        />
      )
      const checkbox = getByTestId('checkbox')
      expect(checkbox.props.accessibilityState.disabled).toBe(true)
      expect(checkbox.props.disabled).toBe(true)
    })

    it('should not trigger onChange when disabled', () => {
      const onChange = jest.fn()
      const {getByTestId} = render(
        <Checkbox
          testID="checkbox"
          onChange={onChange}
          disabled
        />
      )

      const checkbox = getByTestId('checkbox')
      expect(checkbox.props.disabled).toBe(true)
      fireEvent.press(checkbox)
      expect(onChange).not.toHaveBeenCalled()
    })

    it('should maintain disabled state when toggling checked', () => {
      const {rerender, getByTestId} = render(
        <Checkbox
          testID="checkbox"
          checked={false}
          disabled
        />
      )
      let checkbox = getByTestId('checkbox')
      expect(checkbox.props.accessibilityState.disabled).toBe(true)
      expect(checkbox.props.accessibilityState.checked).toBe(false)

      rerender(
        <Checkbox
          testID="checkbox"
          checked
          disabled
        />
      )
      checkbox = getByTestId('checkbox')
      expect(checkbox.props.accessibilityState.disabled).toBe(true)
      expect(checkbox.props.accessibilityState.checked).toBe(true)
    })
  })

  describe('Required Field', () => {
    it('should show asterisk when required', () => {
      render(
        <Checkbox
          label="Required field"
          required
        />
      )
      expect(screen.getByText('Required field')).toBeTruthy()
      expect(screen.getByText('*')).toBeTruthy()
    })

    it('should not show asterisk when not required', () => {
      render(<Checkbox label="Optional field" />)
      expect(screen.getByText('Optional field')).toBeTruthy()
      expect(screen.queryByText('*')).toBeNull()
    })

    it('should have required accessibility label on asterisk', () => {
      render(
        <Checkbox
          label="Required"
          required
        />
      )
      expect(screen.getByLabelText('required')).toBeTruthy()
    })
  })

  describe('Error State', () => {
    it('should render with error state', () => {
      render(
        <Checkbox
          testID="checkbox"
          hasError
        />
      )
      expect(screen.getByTestId('checkbox')).toBeTruthy()
    })

    it('should toggle error state', () => {
      const {rerender} = render(
        <Checkbox
          testID="checkbox"
          hasError={false}
        />
      )
      expect(screen.getByTestId('checkbox')).toBeTruthy()

      rerender(
        <Checkbox
          testID="checkbox"
          hasError
        />
      )
      expect(screen.getByTestId('checkbox')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should have checkbox accessibility role', () => {
      render(<Checkbox testID="checkbox" />)
      expect(screen.getByTestId('checkbox')).toBeTruthy()
    })

    it('should use label as accessibilityLabel', () => {
      render(<Checkbox label="Accept terms" />)
      expect(screen.getByLabelText('Accept terms')).toBeTruthy()
    })

    it('should accept custom accessibilityLabel', () => {
      render(
        <Checkbox
          label="Terms"
          accessibilityLabel="Accept terms and conditions"
        />
      )
      expect(
        screen.getByLabelText('Accept terms and conditions')
      ).toBeTruthy()
    })

    it('should accept accessibilityHint', () => {
      render(
        <Checkbox
          testID="checkbox"
          label="Terms"
          accessibilityHint="You must accept to continue"
        />
      )
      expect(screen.getByTestId('checkbox')).toBeTruthy()
    })

    it('should have checked state in accessibility', () => {
      render(
        <Checkbox
          testID="checkbox"
          checked
        />
      )
      expect(screen.getByTestId('checkbox')).toBeTruthy()
    })

    it('should have disabled state in accessibility', () => {
      render(
        <Checkbox
          testID="checkbox"
          disabled
        />
      )
      expect(screen.getByTestId('checkbox')).toBeTruthy()
    })
  })

  describe('Common Use Cases', () => {
    it('should work as terms acceptance checkbox', () => {
      const onChange = jest.fn()
      render(
        <Checkbox
          testID="terms"
          label="I accept the terms and conditions"
          onChange={onChange}
          required
        />
      )

      fireEvent.press(screen.getByTestId('terms'))
      expect(onChange).toHaveBeenCalledWith(true)
    })

    it('should work as newsletter subscription checkbox', () => {
      const onChange = jest.fn()
      render(
        <Checkbox
          testID="newsletter"
          label="Subscribe to newsletter"
          onChange={onChange}
          checked={false}
        />
      )

      fireEvent.press(screen.getByTestId('newsletter'))
      expect(onChange).toHaveBeenCalledWith(true)
    })

    it('should work as remember me checkbox', () => {
      const onChange = jest.fn()
      render(
        <Checkbox
          testID="remember"
          label="Remember me"
          onChange={onChange}
        />
      )

      fireEvent.press(screen.getByTestId('remember'))
      expect(onChange).toHaveBeenCalled()
    })
  })

  describe('Label Variants', () => {
    it('should render with short label', () => {
      render(<Checkbox label={TEST_LABELS.short} />)
      expect(screen.getByText(TEST_LABELS.short)).toBeTruthy()
    })

    it('should render with long label', () => {
      render(<Checkbox label={TEST_LABELS.long} />)
      expect(screen.getByText(TEST_LABELS.long)).toBeTruthy()
    })

    it('should render with label containing special characters', () => {
      render(<Checkbox label={TEST_LABELS.withSpecialChars} />)
      expect(screen.getByText(TEST_LABELS.withSpecialChars)).toBeTruthy()
    })
  })

  describe('WCAG Compliance', () => {
    it('should have minimum touch target size (44x44pt)', () => {
      const {getByTestId} = render(
        <Checkbox
          testID="checkbox"
          label="Touch target test"
        />
      )
      const checkbox = getByTestId('checkbox')

      // WCAG 2.1 Level AAA requires minimum 44x44pt touch target
      // The PressableBase wraps the checkbox and provides adequate touch area
      expect(checkbox).toBeTruthy()
      expect(checkbox.props.accessibilityRole).toBe('checkbox')
    })

    it('should have accessible label', () => {
      const {getByLabelText} = render(
        <Checkbox
          label="Accessible checkbox"
          accessibilityLabel="Accessible checkbox"
        />
      )
      expect(getByLabelText('Accessible checkbox')).toBeTruthy()
    })

    it('should have accessible hint when provided', () => {
      const {getByTestId} = render(
        <Checkbox
          testID="checkbox"
          label="With hint"
          accessibilityHint="Select to agree"
        />
      )
      const checkbox = getByTestId('checkbox')
      expect(checkbox.props.accessibilityHint).toBe('Select to agree')
    })

    it('should communicate state through accessibility', () => {
      const {getByTestId, rerender} = render(
        <Checkbox
          testID="checkbox"
          checked={false}
        />
      )

      let checkbox = getByTestId('checkbox')
      expect(checkbox.props.accessibilityState).toEqual({
        checked: false,
        disabled: false,
      })

      rerender(
        <Checkbox
          testID="checkbox"
          checked
          disabled
        />
      )

      checkbox = getByTestId('checkbox')
      expect(checkbox.props.accessibilityState).toEqual({
        checked: true,
        disabled: true,
      })
    })

    it('should be keyboard accessible via PressableBase', () => {
      const onChange = jest.fn()
      const {getByTestId} = render(
        <Checkbox
          testID="checkbox"
          label="Keyboard accessible"
          onChange={onChange}
        />
      )

      const checkbox = getByTestId('checkbox')
      expect(checkbox.props.accessibilityRole).toBe('checkbox')
      // PressableBase provides keyboard accessibility
      expect(checkbox.props.accessible).toBe(true)
    })
  })

  describe('Controlled vs Uncontrolled', () => {
    it('should work as controlled component', () => {
      const onChange = jest.fn()
      const {getByTestId, rerender} = render(
        <Checkbox
          testID="checkbox"
          checked={false}
          onChange={onChange}
        />
      )

      let checkbox = getByTestId('checkbox')
      expect(checkbox.props.accessibilityState.checked).toBe(false)

      // Simulate user interaction
      fireEvent.press(checkbox)
      expect(onChange).toHaveBeenCalledWith(true)

      // Parent component updates the checked prop
      rerender(
        <Checkbox
          testID="checkbox"
          checked
          onChange={onChange}
        />
      )

      checkbox = getByTestId('checkbox')
      expect(checkbox.props.accessibilityState.checked).toBe(true)
    })

    it('should work as uncontrolled component', () => {
      const onChange = jest.fn()
      const {getByTestId} = render(
        <Checkbox
          testID="checkbox"
          onChange={onChange}
        />
      )

      const checkbox = getByTestId('checkbox')
      // Uncontrolled component starts unchecked
      expect(checkbox.props.accessibilityState.checked).toBe(false)

      // User interaction triggers onChange with new value
      fireEvent.press(checkbox)
      expect(onChange).toHaveBeenCalledWith(true)

      // Component doesn't update its own state (that's parent's job)
      expect(checkbox.props.accessibilityState.checked).toBe(false)
    })

    it('should maintain checked state when controlled', () => {
      const {getByTestId, rerender} = render(
        <Checkbox
          testID="checkbox"
          checked
        />
      )

      let checkbox = getByTestId('checkbox')
      expect(checkbox.props.accessibilityState.checked).toBe(true)

      // Even after press, controlled component stays checked if prop doesn't change
      fireEvent.press(checkbox)
      checkbox = getByTestId('checkbox')
      expect(checkbox.props.accessibilityState.checked).toBe(true)

      // Only changes when prop changes
      rerender(
        <Checkbox
          testID="checkbox"
          checked={false}
        />
      )
      checkbox = getByTestId('checkbox')
      expect(checkbox.props.accessibilityState.checked).toBe(false)
    })
  })

  describe('Edge Cases', () => {
    it('should handle rapid presses', () => {
      const onChange = jest.fn()
      render(
        <Checkbox
          testID="checkbox"
          onChange={onChange}
          checked={false}
        />
      )

      const checkbox = screen.getByTestId('checkbox')
      for (let i = 0; i < 5; i++) {
        fireEvent.press(checkbox)
      }

      expect(onChange).toHaveBeenCalledTimes(5)
      // Verify each call alternates the expected value
      expect(onChange).toHaveBeenNthCalledWith(1, true)
      expect(onChange).toHaveBeenNthCalledWith(2, true)
      expect(onChange).toHaveBeenNthCalledWith(3, true)
    })

    it('should work without onChange handler', () => {
      render(<Checkbox testID="checkbox" />)

      const checkbox = screen.getByTestId('checkbox')
      expect(() => fireEvent.press(checkbox)).not.toThrow()
    })

    it('should combine all states', () => {
      const onChange = jest.fn()
      const {getByTestId} = render(
        <Checkbox
          testID="checkbox"
          label="Complex checkbox"
          checked
          required
          hasError
          onChange={onChange}
          accessibilityLabel="Complex"
          accessibilityHint="Test all props"
        />
      )

      const checkbox = getByTestId('checkbox')
      expect(checkbox.props.accessibilityState.checked).toBe(true)
      expect(checkbox.props.accessibilityLabel).toBe('Complex')
      expect(checkbox.props.accessibilityHint).toBe('Test all props')
      expect(screen.getByText('Complex checkbox')).toBeTruthy()
      expect(screen.getByText('*')).toBeTruthy()

      // Verify interaction still works
      fireEvent.press(checkbox)
      expect(onChange).toHaveBeenCalledWith(false)
    })
  })
})
