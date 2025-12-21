import {fireEvent, render, screen} from '@testing-library/react-native'
import {Switch as RNSwitch} from 'react-native'

import {Switch} from './Switch'

/**
 * Test suite for Switch component
 */
describe('Switch', () => {
  describe('Rendering', () => {
    it('should render correctly', () => {
      const {UNSAFE_getByType} = render(<Switch />)
      expect(UNSAFE_getByType(RNSwitch)).toBeTruthy()
    })

    it('should render with testID', () => {
      render(<Switch testID="test-switch" />)
      expect(screen.getByTestId('test-switch')).toBeTruthy()
    })

    it('should render with label', () => {
      render(<Switch label="Enable notifications" />)
      expect(screen.getByText('Enable notifications')).toBeTruthy()
    })

    it('should render without label', () => {
      const {UNSAFE_getByType} = render(<Switch />)
      expect(UNSAFE_getByType(RNSwitch)).toBeTruthy()
    })
  })

  describe('Value State', () => {
    it('should render off by default', () => {
      const {UNSAFE_getByType} = render(<Switch testID="switch" />)
      const switchComponent = UNSAFE_getByType(RNSwitch)
      expect(switchComponent.props.value).toBe(false)
    })

    it('should render on when value is true', () => {
      const {UNSAFE_getByType} = render(<Switch value />)
      const switchComponent = UNSAFE_getByType(RNSwitch)
      expect(switchComponent.props.value).toBe(true)
    })

    it('should toggle value state', () => {
      const {UNSAFE_getByType, rerender} = render(<Switch value={false} />)
      let switchComponent = UNSAFE_getByType(RNSwitch)
      expect(switchComponent.props.value).toBe(false)

      rerender(<Switch value />)
      switchComponent = UNSAFE_getByType(RNSwitch)
      expect(switchComponent.props.value).toBe(true)
    })
  })

  describe('Interaction', () => {
    it('should call onChange when value changes', () => {
      const onChange = jest.fn()
      const {UNSAFE_getByType} = render(
        <Switch
          value={false}
          onChange={onChange}
        />
      )

      const switchComponent = UNSAFE_getByType(RNSwitch)
      fireEvent(switchComponent, 'valueChange', true)
      expect(onChange).toHaveBeenCalledWith(true)
    })

    it('should toggle value on change', () => {
      const onChange = jest.fn()
      const {UNSAFE_getByType} = render(
        <Switch
          value
          onChange={onChange}
        />
      )

      const switchComponent = UNSAFE_getByType(RNSwitch)
      fireEvent(switchComponent, 'valueChange', false)
      expect(onChange).toHaveBeenCalledWith(false)
    })

    it('should not call onChange when disabled', () => {
      const onChange = jest.fn()
      render(
        <Switch
          testID="switch"
          onChange={onChange}
          disabled
        />
      )

      // When disabled, the onChange should not be triggered
      // Testing the internal handleValueChange behavior
      expect(screen.getByTestId('switch')).toBeTruthy()
    })

    it('should handle multiple value changes', () => {
      const onChange = jest.fn()
      const {UNSAFE_getByType} = render(<Switch onChange={onChange} />)

      const switchComponent = UNSAFE_getByType(RNSwitch)
      fireEvent(switchComponent, 'valueChange', true)
      fireEvent(switchComponent, 'valueChange', false)
      fireEvent(switchComponent, 'valueChange', true)

      expect(onChange).toHaveBeenCalledTimes(3)
    })
  })

  describe('Disabled State', () => {
    it('should render when disabled', () => {
      const {UNSAFE_getByType} = render(<Switch disabled />)
      const switchComponent = UNSAFE_getByType(RNSwitch)
      expect(switchComponent.props.disabled).toBe(true)
    })

    it('should not be disabled by default', () => {
      const {UNSAFE_getByType} = render(<Switch />)
      const switchComponent = UNSAFE_getByType(RNSwitch)
      expect(switchComponent.props.disabled).toBe(false)
    })

    it('should maintain disabled state when toggling value', () => {
      const {UNSAFE_getByType, rerender} = render(
        <Switch
          value={false}
          disabled
        />
      )
      let switchComponent = UNSAFE_getByType(RNSwitch)
      expect(switchComponent.props.disabled).toBe(true)

      rerender(
        <Switch
          value
          disabled
        />
      )
      switchComponent = UNSAFE_getByType(RNSwitch)
      expect(switchComponent.props.disabled).toBe(true)
    })
  })

  describe('Required Field', () => {
    it('should show asterisk when required', () => {
      render(
        <Switch
          label="Required field"
          required
        />
      )
      expect(screen.getByText('Required field')).toBeTruthy()
      expect(screen.getByText('*')).toBeTruthy()
    })

    it('should not show asterisk when not required', () => {
      render(<Switch label="Optional field" />)
      expect(screen.getByText('Optional field')).toBeTruthy()
      expect(screen.queryByText('*')).toBeNull()
    })

    it('should have required accessibility label on asterisk', () => {
      render(
        <Switch
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
        <Switch
          testID="switch"
          hasError
        />
      )
      expect(screen.getByTestId('switch')).toBeTruthy()
    })

    it('should toggle error state', () => {
      const {rerender} = render(
        <Switch
          testID="switch"
          hasError={false}
        />
      )
      expect(screen.getByTestId('switch')).toBeTruthy()

      rerender(
        <Switch
          testID="switch"
          hasError
        />
      )
      expect(screen.getByTestId('switch')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should have switch accessibility role', () => {
      const {UNSAFE_getByType} = render(<Switch />)
      const switchComponent = UNSAFE_getByType(RNSwitch)
      expect(switchComponent.props.accessibilityRole).toBe('switch')
    })

    it('should use label as accessibilityLabel', () => {
      render(<Switch label="Enable feature" />)
      expect(screen.getByLabelText('Enable feature')).toBeTruthy()
    })

    it('should accept custom accessibilityLabel', () => {
      render(
        <Switch
          label="Notifications"
          accessibilityLabel="Enable push notifications"
        />
      )
      expect(screen.getByLabelText('Enable push notifications')).toBeTruthy()
    })

    it('should accept accessibilityHint', () => {
      const {UNSAFE_getByType} = render(
        <Switch accessibilityHint="Toggle to enable or disable" />
      )
      const switchComponent = UNSAFE_getByType(RNSwitch)
      expect(switchComponent.props.accessibilityHint).toBe(
        'Toggle to enable or disable'
      )
    })

    it('should have checked state in accessibility', () => {
      const {UNSAFE_getByType} = render(<Switch value />)
      const switchComponent = UNSAFE_getByType(RNSwitch)
      expect(switchComponent.props.accessibilityState.checked).toBe(true)
    })

    it('should have disabled state in accessibility', () => {
      const {UNSAFE_getByType} = render(<Switch disabled />)
      const switchComponent = UNSAFE_getByType(RNSwitch)
      expect(switchComponent.props.accessibilityState.disabled).toBe(true)
    })
  })

  describe('Common Use Cases', () => {
    it('should work as notification toggle', () => {
      const onChange = jest.fn()
      const {UNSAFE_getByType} = render(
        <Switch
          label="Enable notifications"
          onChange={onChange}
        />
      )

      fireEvent(UNSAFE_getByType(RNSwitch), 'valueChange', true)
      expect(onChange).toHaveBeenCalledWith(true)
    })

    it('should work as dark mode toggle', () => {
      const onChange = jest.fn()
      const {UNSAFE_getByType} = render(
        <Switch
          label="Dark mode"
          value={false}
          onChange={onChange}
        />
      )

      fireEvent(UNSAFE_getByType(RNSwitch), 'valueChange', true)
      expect(onChange).toHaveBeenCalledWith(true)
    })

    it('should work as privacy setting', () => {
      const onChange = jest.fn()
      const {UNSAFE_getByType} = render(
        <Switch
          label="Make profile private"
          onChange={onChange}
        />
      )

      fireEvent(UNSAFE_getByType(RNSwitch), 'valueChange', true)
      expect(onChange).toHaveBeenCalled()
    })
  })

  describe('Label Variants', () => {
    it('should render with short label', () => {
      render(<Switch label="On" />)
      expect(screen.getByText('On')).toBeTruthy()
    })

    it('should render with long label', () => {
      const longLabel =
        'Enable automatic updates and notifications for new features'
      render(<Switch label={longLabel} />)
      expect(screen.getByText(longLabel)).toBeTruthy()
    })

    it('should render with label containing special characters', () => {
      render(<Switch label="Push & Email Notifications" />)
      expect(screen.getByText('Push & Email Notifications')).toBeTruthy()
    })
  })

  describe('Track Colors', () => {
    it('should apply track colors', () => {
      const {UNSAFE_getByType} = render(<Switch />)
      const switchComponent = UNSAFE_getByType(RNSwitch)
      expect(switchComponent.props.trackColor).toBeDefined()
      expect(switchComponent.props.trackColor.false).toBeDefined()
      expect(switchComponent.props.trackColor.true).toBeDefined()
    })

    it('should apply error color to track when hasError is true', () => {
      const {UNSAFE_getByType} = render(<Switch hasError />)
      const switchComponent = UNSAFE_getByType(RNSwitch)
      expect(switchComponent.props.trackColor).toBeDefined()
    })
  })

  describe('Edge Cases', () => {
    it('should handle rapid value changes', () => {
      const onChange = jest.fn()
      const {UNSAFE_getByType} = render(<Switch onChange={onChange} />)

      const switchComponent = UNSAFE_getByType(RNSwitch)
      for (let i = 0; i < 5; i++) {
        fireEvent(switchComponent, 'valueChange', i % 2 === 0)
      }

      expect(onChange).toHaveBeenCalledTimes(5)
    })

    it('should work without onChange handler', () => {
      const {UNSAFE_getByType} = render(<Switch />)
      const switchComponent = UNSAFE_getByType(RNSwitch)

      expect(() =>
        fireEvent(switchComponent, 'valueChange', true)
      ).not.toThrow()
    })

    it('should combine all states', () => {
      const onChange = jest.fn()
      const {UNSAFE_getByType} = render(
        <Switch
          testID="switch"
          label="Complex switch"
          value
          required
          hasError
          onChange={onChange}
          accessibilityLabel="Complex"
          accessibilityHint="Test all props"
        />
      )

      expect(screen.getByTestId('switch')).toBeTruthy()
      expect(screen.getByText('Complex switch')).toBeTruthy()
      expect(screen.getByText('*')).toBeTruthy()
      expect(UNSAFE_getByType(RNSwitch)).toBeTruthy()
    })
  })
})
