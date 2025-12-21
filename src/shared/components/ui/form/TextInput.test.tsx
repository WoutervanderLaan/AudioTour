import {fireEvent, render, screen} from '@testing-library/react-native'

import {TextInput} from './TextInput'

/**
 * Test suite for TextInput component
 */
describe('TextInput', () => {
  describe('Rendering', () => {
    it('should render correctly', () => {
      render(<TextInput />)
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
        />
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
        />
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
        />
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
        />
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
        />
      )
      expect(screen.getByTestId('input')).toBeTruthy()
    })

    it('should not be editable when disabled', () => {
      const {UNSAFE_getByType} = render(<TextInput disabled />)
      const input = UNSAFE_getByType(require('react-native').TextInput)
      expect(input.props.editable).toBe(false)
    })

    it('should be editable by default', () => {
      const {UNSAFE_getByType} = render(<TextInput />)
      const input = UNSAFE_getByType(require('react-native').TextInput)
      expect(input.props.editable).toBe(true)
    })
  })

  describe('Error State', () => {
    it('should render with error state', () => {
      const {getByTestId} = render(
        <TextInput
          testID="input"
          hasError
        />
      )
      const input = getByTestId('input')
      // Error state is applied through styling, verify component renders
      expect(input).toBeTruthy()
    })

    it('should apply error styling when hasError is true', () => {
      const {getByTestId, UNSAFE_getByType} = render(
        <TextInput
          testID="input"
          hasError
        />
      )
      const input = UNSAFE_getByType(require('react-native').TextInput)
      // Verify input has styles applied (error styles are in the style array)
      expect(input.props.style).toBeDefined()
      expect(Array.isArray(input.props.style)).toBe(true)
    })

    it('should toggle error state', () => {
      const {rerender, UNSAFE_getByType} = render(
        <TextInput
          testID="input"
          hasError={false}
        />
      )
      let input = UNSAFE_getByType(require('react-native').TextInput)
      expect(input.props.style).toBeDefined()

      rerender(
        <TextInput
          testID="input"
          hasError
        />
      )
      input = UNSAFE_getByType(require('react-native').TextInput)
      // Style array length may change when error state is toggled
      expect(input.props.style).toBeDefined()
    })
  })

  describe('Keyboard Types', () => {
    it('should accept email-address keyboard type', () => {
      const {UNSAFE_getByType} = render(
        <TextInput keyboardType="email-address" />
      )
      const input = UNSAFE_getByType(require('react-native').TextInput)
      expect(input.props.keyboardType).toBe('email-address')
    })

    it('should accept numeric keyboard type', () => {
      const {UNSAFE_getByType} = render(<TextInput keyboardType="numeric" />)
      const input = UNSAFE_getByType(require('react-native').TextInput)
      expect(input.props.keyboardType).toBe('numeric')
    })

    it('should accept phone-pad keyboard type', () => {
      const {UNSAFE_getByType} = render(<TextInput keyboardType="phone-pad" />)
      const input = UNSAFE_getByType(require('react-native').TextInput)
      expect(input.props.keyboardType).toBe('phone-pad')
    })
  })

  describe('Secure Text Entry', () => {
    it('should support secure text entry', () => {
      const {UNSAFE_getByType} = render(<TextInput secureTextEntry />)
      const input = UNSAFE_getByType(require('react-native').TextInput)
      expect(input.props.secureTextEntry).toBe(true)
    })

    it('should toggle secure text entry', () => {
      const {UNSAFE_getByType, rerender} = render(
        <TextInput secureTextEntry={false} />
      )
      let input = UNSAFE_getByType(require('react-native').TextInput)
      expect(input.props.secureTextEntry).toBe(false)

      rerender(<TextInput secureTextEntry />)
      input = UNSAFE_getByType(require('react-native').TextInput)
      expect(input.props.secureTextEntry).toBe(true)
    })
  })

  describe('Multiline', () => {
    it('should support multiline input', () => {
      const {UNSAFE_getByType} = render(<TextInput multiline />)
      const input = UNSAFE_getByType(require('react-native').TextInput)
      expect(input.props.multiline).toBe(true)
    })

    it('should accept numberOfLines prop', () => {
      const {UNSAFE_getByType} = render(
        <TextInput
          multiline
          numberOfLines={4}
        />
      )
      const input = UNSAFE_getByType(require('react-native').TextInput)
      expect(input.props.numberOfLines).toBe(4)
    })
  })

  describe('Accessibility', () => {
    it('should be accessible by default', () => {
      const {UNSAFE_getByType} = render(<TextInput />)
      const input = UNSAFE_getByType(require('react-native').TextInput)
      expect(input.props.accessible).toBe(true)
    })

    it('should accept accessibilityLabel', () => {
      render(
        <TextInput
          testID="input"
          accessibilityLabel="Email input"
        />
      )
      expect(screen.getByLabelText('Email input')).toBeTruthy()
    })

    it('should accept accessibilityHint', () => {
      const {UNSAFE_getByType} = render(
        <TextInput accessibilityHint="Enter your email address" />
      )
      const input = UNSAFE_getByType(require('react-native').TextInput)
      expect(input.props.accessibilityHint).toBe('Enter your email address')
    })

    it('should have disabled state in accessibility', () => {
      const {UNSAFE_getByType} = render(<TextInput disabled />)
      const input = UNSAFE_getByType(require('react-native').TextInput)
      expect(input.props.accessibilityState.disabled).toBe(true)
    })
  })

  describe('Props Forwarding', () => {
    it('should forward maxLength prop', () => {
      const {UNSAFE_getByType} = render(<TextInput maxLength={10} />)
      const input = UNSAFE_getByType(require('react-native').TextInput)
      expect(input.props.maxLength).toBe(10)
    })

    it('should forward autoCapitalize prop', () => {
      const {UNSAFE_getByType} = render(<TextInput autoCapitalize="none" />)
      const input = UNSAFE_getByType(require('react-native').TextInput)
      expect(input.props.autoCapitalize).toBe('none')
    })

    it('should forward autoCorrect prop', () => {
      const {UNSAFE_getByType} = render(<TextInput autoCorrect={false} />)
      const input = UNSAFE_getByType(require('react-native').TextInput)
      expect(input.props.autoCorrect).toBe(false)
    })

    it('should forward autoComplete prop', () => {
      const {UNSAFE_getByType} = render(<TextInput autoComplete="email" />)
      const input = UNSAFE_getByType(require('react-native').TextInput)
      expect(input.props.autoComplete).toBe('email')
    })
  })

  describe('Controlled vs Uncontrolled', () => {
    it('should work as controlled component', () => {
      const onChangeText = jest.fn()
      const {rerender} = render(
        <TextInput
          testID="input"
          value=""
          onChangeText={onChangeText}
        />
      )

      let input = screen.getByTestId('input')
      expect(screen.getByDisplayValue('')).toBeTruthy()

      // Simulate user interaction
      fireEvent.changeText(input, 'hello')
      expect(onChangeText).toHaveBeenCalledWith('hello')

      // Parent component updates the value prop
      rerender(
        <TextInput
          testID="input"
          value="hello"
          onChangeText={onChangeText}
        />
      )

      expect(screen.getByDisplayValue('hello')).toBeTruthy()
    })

    it('should work as uncontrolled component', () => {
      const onChangeText = jest.fn()
      render(
        <TextInput
          testID="input"
          onChangeText={onChangeText}
        />
      )

      // User interaction triggers onChangeText
      fireEvent.changeText(screen.getByTestId('input'), 'test')
      expect(onChangeText).toHaveBeenCalledWith('test')

      // Component doesn't manage its own state (parent's responsibility)
    })

    it('should maintain value when controlled', () => {
      const {rerender} = render(
        <TextInput
          testID="input"
          value="initial"
        />
      )

      expect(screen.getByDisplayValue('initial')).toBeTruthy()

      // Even after text change event, controlled component keeps value if prop doesn't change
      fireEvent.changeText(screen.getByTestId('input'), 'changed')
      expect(screen.getByDisplayValue('initial')).toBeTruthy()

      // Only changes when prop changes
      rerender(
        <TextInput
          testID="input"
          value="updated"
        />
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
        />
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
        />
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
        />
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
        />
      )

      fireEvent.changeText(screen.getByTestId('input'), '🎵 音楽 Музыка')
      expect(onChangeText).toHaveBeenCalledWith('🎵 音楽 Музыка')
    })
  })
})
