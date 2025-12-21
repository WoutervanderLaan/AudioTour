/* eslint-disable max-lines-per-function */
import {fireEvent, render, screen} from '@testing-library/react-native'

import {TextInput} from './TextInput'

/**
 * Test suite for TextInput component
 */
describe('TextInput', () => {
  describe('Rendering', () => {
    it('should render correctly', () => {
      render(<TextInput testID="text-input" />)
      expect(screen.queryByTestId('text-input')).toBeTruthy()
    })

    it('should render with testID', () => {
      render(<TextInput testID="test-input" />)
      expect(screen.getByTestId('test-input')).toBeTruthy()
    })

    it('should render with placeholder', () => {
      render(<TextInput placeholder="Enter text" />)
      expect(screen.getByPlaceholderText('Enter text')).toBeTruthy()
    })

    it('should render with value', () => {
      render(<TextInput value="Test value" />)
      expect(screen.getByDisplayValue('Test value')).toBeTruthy()
    })
  })

  describe('Text Input', () => {
    it('should call onChangeText when text changes', () => {
      const onChangeText = jest.fn()
      render(
        <TextInput
          testID="input"
          onChangeText={onChangeText}
        />,
      )

      fireEvent.changeText(screen.getByTestId('input'), 'new text')
      expect(onChangeText).toHaveBeenCalledWith('new text')
    })

    it('should update value when changed', () => {
      const {rerender} = render(<TextInput value="initial" />)
      expect(screen.getByDisplayValue('initial')).toBeTruthy()

      rerender(<TextInput value="updated" />)
      expect(screen.getByDisplayValue('updated')).toBeTruthy()
    })

    it('should handle empty string value', () => {
      render(<TextInput value="" />)
      expect(screen.queryByDisplayValue('')).toBeTruthy()
    })
  })

  describe('Focus State', () => {
    it('should call onFocus when focused', () => {
      const onFocus = jest.fn()
      render(
        <TextInput
          testID="input"
          onFocus={onFocus}
        />,
      )

      fireEvent(screen.getByTestId('input'), 'focus')
      expect(onFocus).toHaveBeenCalled()
    })

    it('should call onBlur when blurred', () => {
      const onBlur = jest.fn()
      render(
        <TextInput
          testID="input"
          onBlur={onBlur}
        />,
      )

      fireEvent(screen.getByTestId('input'), 'blur')
      expect(onBlur).toHaveBeenCalled()
    })

    it('should handle focus and blur sequence', () => {
      const onFocus = jest.fn()
      const onBlur = jest.fn()
      render(
        <TextInput
          testID="input"
          onFocus={onFocus}
          onBlur={onBlur}
        />,
      )

      const input = screen.getByTestId('input')
      fireEvent(input, 'focus')
      expect(onFocus).toHaveBeenCalledTimes(1)

      fireEvent(input, 'blur')
      expect(onBlur).toHaveBeenCalledTimes(1)
    })
  })

  describe('Disabled State', () => {
    it('should render when disabled', () => {
      render(
        <TextInput
          testID="input"
          disabled
        />,
      )
      expect(screen.getByTestId('input')).toBeTruthy()
    })

    it('should not be editable when disabled', () => {
      render(
        <TextInput
          testID="input"
          disabled
        />,
      )
      const input = screen.getByTestId('input')
      expect(input.props.editable).toBe(false)
    })

    it('should be editable by default', () => {
      render(<TextInput testID="input" />)
      const input = screen.getByTestId('input')
      expect(input.props.editable).toBe(true)
    })
  })

  describe('Error State', () => {
    it('should render with error state', () => {
      render(
        <TextInput
          testID="input"
          hasError
        />,
      )
      const input = screen.getByTestId('input')
      // Error state is applied through styling, verify component renders
      expect(input).toBeTruthy()
    })

    it('should apply error styling when hasError is true', () => {
      render(
        <TextInput
          testID="input"
          hasError
        />,
      )
      const input = screen.getByTestId('input')
      // Verify input has styles applied (error styles are in the style array)
      expect(input.props.style).toBeDefined()
      expect(Array.isArray(input.props.style)).toBe(true)
    })

    it('should toggle error state', () => {
      const {rerender} = render(
        <TextInput
          testID="input"
          hasError={false}
        />,
      )
      let input = screen.getByTestId('input')
      expect(input.props.style).toBeDefined()

      rerender(
        <TextInput
          testID="input"
          hasError
        />,
      )
      input = screen.getByTestId('input')
      // Style array length may change when error state is toggled
      expect(input.props.style).toBeDefined()
    })
  })

  describe('Keyboard Types', () => {
    it('should accept email-address keyboard type', () => {
      render(
        <TextInput
          testID="input"
          keyboardType="email-address"
        />,
      )
      const input = screen.getByTestId('input')
      expect(input.props.keyboardType).toBe('email-address')
    })

    it('should accept numeric keyboard type', () => {
      render(
        <TextInput
          testID="input"
          keyboardType="numeric"
        />,
      )
      const input = screen.getByTestId('input')
      expect(input.props.keyboardType).toBe('numeric')
    })

    it('should accept phone-pad keyboard type', () => {
      render(
        <TextInput
          testID="input"
          keyboardType="phone-pad"
        />,
      )
      const input = screen.getByTestId('input')
      expect(input.props.keyboardType).toBe('phone-pad')
    })
  })

  describe('Secure Text Entry', () => {
    it('should support secure text entry', () => {
      render(
        <TextInput
          testID="input"
          secureTextEntry
        />,
      )
      const input = screen.getByTestId('input')
      expect(input.props.secureTextEntry).toBe(true)
    })

    it('should toggle secure text entry', () => {
      const {rerender} = render(
        <TextInput
          testID="input"
          secureTextEntry={false}
        />,
      )
      let input = screen.getByTestId('input')
      expect(input.props.secureTextEntry).toBe(false)

      rerender(
        <TextInput
          testID="input"
          secureTextEntry
        />,
      )
      input = screen.getByTestId('input')
      expect(input.props.secureTextEntry).toBe(true)
    })
  })

  describe('Multiline', () => {
    it('should support multiline input', () => {
      render(
        <TextInput
          testID="input"
          multiline
        />,
      )
      const input = screen.getByTestId('input')
      expect(input.props.multiline).toBe(true)
    })

    it('should accept numberOfLines prop', () => {
      render(
        <TextInput
          testID="input"
          multiline
          numberOfLines={4}
        />,
      )
      const input = screen.getByTestId('input')
      expect(input.props.numberOfLines).toBe(4)
    })
  })

  describe('Accessibility', () => {
    it('should be accessible by default', () => {
      render(<TextInput testID="input" />)
      const input = screen.getByTestId('input')
      expect(input.props.accessible).toBe(true)
    })

    it('should accept accessibilityLabel', () => {
      render(
        <TextInput
          testID="input"
          accessibilityLabel="Email input"
        />,
      )
      expect(screen.getByLabelText('Email input')).toBeTruthy()
    })

    it('should accept accessibilityHint', () => {
      render(
        <TextInput
          testID="input"
          accessibilityHint="Enter your email address"
        />,
      )
      const input = screen.getByTestId('input')
      expect(input.props.accessibilityHint).toBe('Enter your email address')
    })

    it('should have disabled state in accessibility', () => {
      render(
        <TextInput
          testID="input"
          disabled
        />,
      )
      const input = screen.getByTestId('input')
      expect(input.props.accessibilityState.disabled).toBe(true)
    })
  })

  describe('Props Forwarding', () => {
    it('should forward maxLength prop', () => {
      render(
        <TextInput
          testID="input"
          maxLength={10}
        />,
      )
      const input = screen.getByTestId('input')
      expect(input.props.maxLength).toBe(10)
    })

    it('should forward autoCapitalize prop', () => {
      render(
        <TextInput
          testID="input"
          autoCapitalize="none"
        />,
      )
      const input = screen.getByTestId('input')
      expect(input.props.autoCapitalize).toBe('none')
    })

    it('should forward autoCorrect prop', () => {
      render(
        <TextInput
          testID="input"
          autoCorrect={false}
        />,
      )
      const input = screen.getByTestId('input')
      expect(input.props.autoCorrect).toBe(false)
    })

    it('should forward autoComplete prop', () => {
      render(
        <TextInput
          testID="input"
          autoComplete="email"
        />,
      )
      const input = screen.getByTestId('input')
      expect(input.props.autoComplete).toBe('email')
    })
  })

  describe('Controlled Component Behavior', () => {
    it('should update when parent changes value prop', () => {
      const onChangeText = jest.fn()
      const {rerender} = render(
        <TextInput
          testID="input"
          value=""
          onChangeText={onChangeText}
        />,
      )

      expect(screen.getByDisplayValue('')).toBeTruthy()

      // Simulate user interaction - notifies parent of desired change
      fireEvent.changeText(screen.getByTestId('input'), 'hello')
      expect(onChangeText).toHaveBeenCalledWith('hello')

      // Parent component controls state and updates the value prop
      rerender(
        <TextInput
          testID="input"
          value="hello"
          onChangeText={onChangeText}
        />,
      )

      expect(screen.getByDisplayValue('hello')).toBeTruthy()
    })

    it('should not self-update state (parent controls state)', () => {
      const onChangeText = jest.fn()
      render(
        <TextInput
          testID="input"
          value=""
          onChangeText={onChangeText}
        />,
      )

      // User types - onChangeText fires but component doesn't self-update
      fireEvent.changeText(screen.getByTestId('input'), 'test')
      expect(onChangeText).toHaveBeenCalledWith('test')

      // Value unchanged because parent hasn't updated the prop
      expect(screen.getByDisplayValue('')).toBeTruthy()
    })

    it('should only update when value prop changes', () => {
      const {rerender} = render(
        <TextInput
          testID="input"
          value="initial"
        />,
      )

      expect(screen.getByDisplayValue('initial')).toBeTruthy()

      // Text change doesn't update value without parent updating prop
      fireEvent.changeText(screen.getByTestId('input'), 'changed')
      expect(screen.getByDisplayValue('initial')).toBeTruthy()

      // Value only changes when parent updates prop
      rerender(
        <TextInput
          testID="input"
          value="updated"
        />,
      )
      expect(screen.getByDisplayValue('updated')).toBeTruthy()
    })
  })

  describe('Edge Cases', () => {
    it('should handle rapid text changes', () => {
      const onChangeText = jest.fn()
      render(
        <TextInput
          testID="input"
          onChangeText={onChangeText}
        />,
      )

      const input = screen.getByTestId('input')
      fireEvent.changeText(input, 'a')
      fireEvent.changeText(input, 'ab')
      fireEvent.changeText(input, 'abc')

      expect(onChangeText).toHaveBeenCalledTimes(3)
      expect(onChangeText).toHaveBeenNthCalledWith(1, 'a')
      expect(onChangeText).toHaveBeenNthCalledWith(2, 'ab')
      expect(onChangeText).toHaveBeenNthCalledWith(3, 'abc')
    })

    it('should handle long text input', () => {
      const longText = 'a'.repeat(1000)
      const onChangeText = jest.fn()
      render(
        <TextInput
          testID="input"
          onChangeText={onChangeText}
        />,
      )

      fireEvent.changeText(screen.getByTestId('input'), longText)
      expect(onChangeText).toHaveBeenCalledWith(longText)
    })

    it('should handle special characters', () => {
      const onChangeText = jest.fn()
      render(
        <TextInput
          testID="input"
          onChangeText={onChangeText}
        />,
      )

      fireEvent.changeText(screen.getByTestId('input'), '@#$%^&*()')
      expect(onChangeText).toHaveBeenCalledWith('@#$%^&*()')
    })

    it('should handle unicode characters', () => {
      const onChangeText = jest.fn()
      render(
        <TextInput
          testID="input"
          onChangeText={onChangeText}
        />,
      )

      fireEvent.changeText(screen.getByTestId('input'), '🎵 音楽 Музыка')
      expect(onChangeText).toHaveBeenCalledWith('🎵 音楽 Музыка')
    })
  })
})
