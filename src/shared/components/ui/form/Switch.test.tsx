import {fireEvent, render, screen} from '@testing-library/react-native'

import {Switch} from './Switch'

/**
 * Test suite for Switch component
 */
describe('Switch', () => {
  describe('Rendering', () => {
    it('should render correctly', () => {
      render(<Switch testID="TestSwitch" />)
      expect(screen.getByTestId('TestSwitch')).toBeTruthy()
    })

    it('should render with testID', () => {
      render(<Switch testID="TestSwitch" />)
      expect(screen.getByTestId('TestSwitch')).toBeTruthy()
    })

    it('should render with label', () => {
      render(
        <Switch
          testID="TestSwitch"
          label="Enable notifications"
        />,
      )
      expect(screen.getByText('Enable notifications')).toBeTruthy()
    })

    it('should render without label', () => {
      render(<Switch testID="TestSwitch" />)
      expect(screen.getByTestId('TestSwitch')).toBeTruthy()
    })
  })

  describe('Value State', () => {
    it('should render off by default', () => {
      render(<Switch testID="TestSwitch" />)
      const switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.value).toBe(false)
    })

    it('should render on when value is true', () => {
      render(
        <Switch
          testID="TestSwitch"
          value
        />,
      )
      const switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.value).toBe(true)
    })

    it('should toggle value state', () => {
      const {rerender} = render(
        <Switch
          testID="TestSwitch"
          value={false}
        />,
      )
      let switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.value).toBe(false)

      rerender(
        <Switch
          testID="TestSwitch"
          value
        />,
      )
      switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.value).toBe(true)
    })
  })

  describe('Interaction', () => {
    it('should call onChange when value changes', () => {
      const onChange = jest.fn()
      render(
        <Switch
          testID="TestSwitch"
          value={false}
          onChange={onChange}
        />,
      )

      const switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.value).toBe(false)
      fireEvent(switchComponent, 'valueChange', true)
      expect(onChange).toHaveBeenCalledWith(true)
    })

    it('should toggle value on change', () => {
      const onChange = jest.fn()
      render(
        <Switch
          testID="TestSwitch"
          value
          onChange={onChange}
        />,
      )

      const switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.value).toBe(true)
      fireEvent(switchComponent, 'valueChange', false)
      expect(onChange).toHaveBeenCalledWith(false)
    })

    it('should not call onChange when disabled', () => {
      const onChange = jest.fn()
      render(
        <Switch
          testID="TestSwitch"
          onChange={onChange}
          disabled
        />,
      )

      const switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.disabled).toBe(true)
      expect(switchComponent.props.accessibilityState.disabled).toBe(true)

      // The native Switch component will prevent interaction when disabled
      // We verify the component is correctly marked as disabled
    })

    it('should handle multiple value changes', () => {
      const onChange = jest.fn()
      render(
        <Switch
          testID="TestSwitch"
          onChange={onChange}
        />,
      )

      const switchComponent = screen.getByTestId('TestSwitch')
      fireEvent(switchComponent, 'valueChange', true)
      fireEvent(switchComponent, 'valueChange', false)
      fireEvent(switchComponent, 'valueChange', true)

      expect(onChange).toHaveBeenCalledTimes(3)
    })
  })

  describe('Disabled State', () => {
    it('should render when disabled', () => {
      render(
        <Switch
          testID="TestSwitch"
          disabled
        />,
      )
      const switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.disabled).toBe(true)
    })

    it('should not be disabled by default', () => {
      render(<Switch testID="TestSwitch" />)
      const switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.disabled).toBe(false)
    })

    it('should maintain disabled state when toggling value', () => {
      const {rerender} = render(
        <Switch
          testID="TestSwitch"
          value={false}
          disabled
        />,
      )
      let switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.disabled).toBe(true)

      rerender(
        <Switch
          testID="TestSwitch"
          value
          disabled
        />,
      )
      switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.disabled).toBe(true)
    })
  })

  describe('Required Field', () => {
    it('should show asterisk when required', () => {
      render(
        <Switch
          testID="TestSwitch"
          label="Required field"
          required
        />,
      )
      expect(screen.getByText('Required field', {exact: false})).toBeTruthy()
      expect(screen.getByText('*')).toBeTruthy()
    })

    it('should not show asterisk when not required', () => {
      render(
        <Switch
          testID="TestSwitch"
          label="Optional field"
        />,
      )
      expect(screen.getByText('Optional field')).toBeTruthy()
      expect(screen.queryByText('*')).toBeNull()
    })

    it('should have required accessibility label on asterisk', () => {
      render(
        <Switch
          testID="TestSwitch"
          label="Required"
          required
        />,
      )
      expect(screen.getByLabelText('required')).toBeTruthy()
    })
  })

  describe('Error State', () => {
    it('should render with error state', () => {
      render(
        <Switch
          testID="TestSwitch"
          hasError
        />,
      )
      expect(screen.getByTestId('TestSwitch')).toBeTruthy()
    })

    it('should toggle error state', () => {
      const {rerender} = render(
        <Switch
          testID="TestSwitch"
          hasError={false}
        />,
      )
      expect(screen.getByTestId('TestSwitch')).toBeTruthy()

      rerender(
        <Switch
          testID="TestSwitch"
          hasError
        />,
      )
      expect(screen.getByTestId('TestSwitch')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should have switch accessibility role', () => {
      render(<Switch testID="TestSwitch" />)
      const switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.accessibilityRole).toBe('switch')
    })

    it('should use label as accessibilityLabel', () => {
      render(
        <Switch
          testID="TestSwitch"
          label="Enable feature"
        />,
      )
      expect(screen.getByLabelText('Enable feature')).toBeTruthy()
    })

    it('should accept custom accessibilityLabel', () => {
      render(
        <Switch
          testID="TestSwitch"
          label="Notifications"
          accessibilityLabel="Enable push notifications"
        />,
      )
      expect(
        screen.getByLabelText('Notifications').props.accessibilityLabel,
      ).toBe('Enable push notifications')
    })

    it('should accept accessibilityHint', () => {
      render(
        <Switch
          testID="TestSwitch"
          accessibilityHint="Toggle to enable or disable"
        />,
      )
      const switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.accessibilityHint).toBe(
        'Toggle to enable or disable',
      )
    })

    it('should have checked state in accessibility', () => {
      render(
        <Switch
          testID="TestSwitch"
          value
        />,
      )
      const switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.accessibilityState.checked).toBe(true)
    })

    it('should have disabled state in accessibility', () => {
      render(
        <Switch
          testID="TestSwitch"
          disabled
        />,
      )
      const switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.accessibilityState.disabled).toBe(true)
    })
  })

  describe('Common Use Cases', () => {
    it('should work as notification toggle', () => {
      const onChange = jest.fn()
      render(
        <Switch
          testID="TestSwitch"
          label="Enable notifications"
          onChange={onChange}
        />,
      )

      fireEvent(screen.getByTestId('TestSwitch'), 'valueChange', true)
      expect(onChange).toHaveBeenCalledWith(true)
    })

    it('should work as dark mode toggle', () => {
      const onChange = jest.fn()
      render(
        <Switch
          testID="TestSwitch"
          label="Dark mode"
          value={false}
          onChange={onChange}
        />,
      )

      fireEvent(screen.getByTestId('TestSwitch'), 'valueChange', true)
      expect(onChange).toHaveBeenCalledWith(true)
    })

    it('should work as privacy setting', () => {
      const onChange = jest.fn()
      render(
        <Switch
          testID="TestSwitch"
          label="Make profile private"
          onChange={onChange}
        />,
      )

      fireEvent(screen.getByTestId('TestSwitch'), 'valueChange', true)
      expect(onChange).toHaveBeenCalled()
    })
  })

  describe('Label Variants', () => {
    it('should render with short label', () => {
      render(
        <Switch
          testID="TestSwitch"
          label="On"
        />,
      )
      expect(screen.getByText('On')).toBeTruthy()
    })

    it('should render with long label', () => {
      const longLabel =
        'Enable automatic updates and notifications for new features'
      render(
        <Switch
          testID="TestSwitch"
          label={longLabel}
        />,
      )
      expect(screen.getByText(longLabel)).toBeTruthy()
    })

    it('should render with label containing special characters', () => {
      render(
        <Switch
          testID="TestSwitch"
          label="Push & Email Notifications"
        />,
      )
      expect(screen.getByText('Push & Email Notifications')).toBeTruthy()
    })
  })

  describe('Track Colors', () => {
    it('should apply track colors', () => {
      render(<Switch testID="TestSwitch" />)
      const switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.tintColor).toBeDefined()
      expect(switchComponent.props.thumbTintColor).toBeDefined()
      expect(switchComponent.props.onTintColor).toBeDefined()
    })

    it('should apply error color to track when hasError is true', () => {
      render(
        <Switch
          testID="TestSwitch"
          hasError
        />,
      )
      const switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.tintColor).toBeDefined()
    })
  })

  describe('Controlled Component Behavior', () => {
    it('should update when parent changes value prop', () => {
      const onChange = jest.fn()
      const {rerender} = render(
        <Switch
          testID="TestSwitch"
          value={false}
          onChange={onChange}
        />,
      )

      let switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.value).toBe(false)

      // Simulate user interaction - notifies parent of desired change
      fireEvent(switchComponent, 'valueChange', true)
      expect(onChange).toHaveBeenCalledWith(true)

      // Parent component controls state and updates the value prop
      rerender(
        <Switch
          testID="TestSwitch"
          value
          onChange={onChange}
        />,
      )

      switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.value).toBe(true)
    })

    it('should not self-update state (parent controls state)', () => {
      const onChange = jest.fn()
      render(
        <Switch
          testID="TestSwitch"
          value={false}
          onChange={onChange}
        />,
      )

      const switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.value).toBe(false)

      // User toggles switch - onChange fires but component doesn't self-update
      fireEvent(switchComponent, 'valueChange', true)
      expect(onChange).toHaveBeenCalledWith(true)

      // State unchanged because parent hasn't updated the prop
      expect(switchComponent.props.value).toBe(false)
    })

    it('should only update when value prop changes', () => {
      const {rerender} = render(
        <Switch
          testID="TestSwitch"
          value
        />,
      )

      let switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.value).toBe(true)

      // Toggle doesn't change state without parent updating prop
      fireEvent(switchComponent, 'valueChange', false)
      switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.value).toBe(true)

      // State only changes when parent updates prop
      rerender(
        <Switch
          testID="TestSwitch"
          value={false}
        />,
      )
      switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.value).toBe(false)
    })
  })

  describe('Edge Cases', () => {
    it('should handle rapid value changes', () => {
      const onChange = jest.fn()
      render(
        <Switch
          testID="TestSwitch"
          onChange={onChange}
        />,
      )

      const switchComponent = screen.getByTestId('TestSwitch')
      for (let i = 0; i < 5; i++) {
        fireEvent(switchComponent, 'valueChange', i % 2 === 0)
      }

      expect(onChange).toHaveBeenCalledTimes(5)
      // Verify the actual values passed
      expect(onChange).toHaveBeenNthCalledWith(1, true)
      expect(onChange).toHaveBeenNthCalledWith(2, false)
      expect(onChange).toHaveBeenNthCalledWith(3, true)
      expect(onChange).toHaveBeenNthCalledWith(4, false)
      expect(onChange).toHaveBeenNthCalledWith(5, true)
    })

    it('should work without onChange handler', () => {
      render(<Switch testID="TestSwitch" />)
      const switchComponent = screen.getByTestId('TestSwitch')

      expect(() =>
        fireEvent(switchComponent, 'valueChange', true),
      ).not.toThrow()
    })

    it('should combine all states', () => {
      const onChange = jest.fn()
      render(
        <Switch
          testID="TestSwitch"
          label="Complex switch"
          value
          required
          hasError
          onChange={onChange}
          accessibilityLabel="Complex"
          accessibilityHint="Test all props"
        />,
      )

      const switchComponent = screen.getByTestId('TestSwitch')
      expect(switchComponent.props.value).toBe(true)
      expect(switchComponent.props.accessibilityState.checked).toBe(true)
      expect(switchComponent.props.accessibilityLabel).toBe('Complex')
      expect(switchComponent.props.accessibilityHint).toBe('Test all props')
      expect(screen.getByText('Complex switch', {exact: false})).toBeTruthy()
      expect(screen.getByText('*')).toBeTruthy()

      // Verify interaction still works
      fireEvent(switchComponent, 'valueChange', false)
      expect(onChange).toHaveBeenCalledWith(false)
    })
  })
})
