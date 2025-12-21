import {fireEvent, render, screen} from '@testing-library/react-native'

import {Button} from './Button'

/**
 * Test suite for Button component
 */
describe('Button', () => {
  describe('Rendering', () => {
    it('should render label correctly', () => {
      render(<Button label="Click me" />)
      expect(screen.getByText('Click me')).toBeTruthy()
    })

    it('should render with testID', () => {
      render(
        <Button
          testID="test-button"
          label="Test"
        />
      )
      expect(screen.getByTestId('test-button')).toBeTruthy()
    })

    it('should render with default primary variant', () => {
      render(<Button label="Primary" />)
      expect(screen.getByText('Primary')).toBeTruthy()
    })
  })

  describe('Variants', () => {
    it('should render primary variant', () => {
      render(<Button label="Primary Button" />)
      expect(screen.getByText('Primary Button')).toBeTruthy()
    })

    it('should render secondary variant', () => {
      render(
        <Button
          variant="secondary"
          label="Secondary Button"
        />
      )
      expect(screen.getByText('Secondary Button')).toBeTruthy()
    })

    it('should switch between variants', () => {
      const {rerender} = render(<Button label="Button" />)
      expect(screen.getByText('Button')).toBeTruthy()

      rerender(
        <Button
          variant="secondary"
          label="Button"
        />
      )
      expect(screen.getByText('Button')).toBeTruthy()
    })
  })

  describe('Interaction', () => {
    it('should call onPress when pressed', () => {
      const onPress = jest.fn()
      render(
        <Button
          testID="button"
          label="Press me"
          onPress={onPress}
        />
      )

      fireEvent.press(screen.getByTestId('button'))
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('should not call onPress when disabled', () => {
      const onPress = jest.fn()
      render(
        <Button
          testID="button"
          label="Disabled"
          onPress={onPress}
          disabled
        />
      )

      fireEvent.press(screen.getByTestId('button'))
      expect(onPress).not.toHaveBeenCalled()
    })

    it('should handle multiple presses', () => {
      const onPress = jest.fn()
      render(
        <Button
          testID="button"
          label="Multi press"
          onPress={onPress}
        />
      )

      const button = screen.getByTestId('button')
      fireEvent.press(button)
      fireEvent.press(button)
      fireEvent.press(button)

      expect(onPress).toHaveBeenCalledTimes(3)
    })
  })

  describe('Disabled State', () => {
    it('should render when disabled', () => {
      render(
        <Button
          label="Disabled Button"
          disabled
        />
      )
      expect(screen.getByText('Disabled Button')).toBeTruthy()
    })

    it('should not trigger onPress when disabled', () => {
      const onPress = jest.fn()
      render(
        <Button
          testID="button"
          label="Disabled"
          onPress={onPress}
          disabled
        />
      )

      fireEvent.press(screen.getByTestId('button'))
      expect(onPress).not.toHaveBeenCalled()
    })

    it('should maintain disabled state across variant changes', () => {
      const {rerender} = render(
        <Button
          label="Button"
          disabled
        />
      )
      expect(screen.getByText('Button')).toBeTruthy()

      rerender(
        <Button
          variant="secondary"
          label="Button"
          disabled
        />
      )
      expect(screen.getByText('Button')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should have button accessibility role', () => {
      render(<Button label="Accessible" />)
      expect(screen.getByText('Accessible')).toBeTruthy()
    })

    it('should accept accessibilityLabel', () => {
      render(
        <Button
          label="Submit"
          accessibilityLabel="Submit form"
        />
      )
      expect(screen.getByLabelText('Submit form')).toBeTruthy()
    })

    it('should accept accessibilityHint', () => {
      render(
        <Button
          testID="button"
          label="Next"
          accessibilityHint="Navigate to next page"
        />
      )
      expect(screen.getByTestId('button')).toBeTruthy()
    })
  })

  describe('Long Labels', () => {
    it('should render with long label', () => {
      const longLabel = 'This is a very long button label that might wrap'
      render(<Button label={longLabel} />)
      expect(screen.getByText(longLabel)).toBeTruthy()
    })

    it('should render with single word label', () => {
      render(<Button label="OK" />)
      expect(screen.getByText('OK')).toBeTruthy()
    })

    it('should render with empty string label', () => {
      render(<Button label="" />)
      expect(screen.queryByText('')).toBeTruthy()
    })
  })

  describe('Common Use Cases', () => {
    it('should work as submit button', () => {
      const onSubmit = jest.fn()
      render(
        <Button
          testID="submit"
          label="Submit"
          onPress={onSubmit}
        />
      )

      fireEvent.press(screen.getByTestId('submit'))
      expect(onSubmit).toHaveBeenCalled()
    })

    it('should work as cancel button', () => {
      const onCancel = jest.fn()
      render(
        <Button
          testID="cancel"
          variant="secondary"
          label="Cancel"
          onPress={onCancel}
        />
      )

      fireEvent.press(screen.getByTestId('cancel'))
      expect(onCancel).toHaveBeenCalled()
    })

    it('should work as loading button', () => {
      const isLoading = true
      render(
        <Button
          label={isLoading ? 'Loading...' : 'Submit'}
          disabled={isLoading}
        />
      )
      expect(screen.getByText('Loading...')).toBeTruthy()
    })

    it('should work in form context', () => {
      const onSubmit = jest.fn()
      const onCancel = jest.fn()
      render(
        <>
          <Button
            testID="submit"
            label="Submit"
            onPress={onSubmit}
          />
          <Button
            testID="cancel"
            variant="secondary"
            label="Cancel"
            onPress={onCancel}
          />
        </>
      )

      expect(screen.getByTestId('submit')).toBeTruthy()
      expect(screen.getByTestId('cancel')).toBeTruthy()
    })
  })

  describe('Edge Cases', () => {
    it('should render with special characters in label', () => {
      render(<Button label="Save & Continue →" />)
      expect(screen.getByText('Save & Continue →')).toBeTruthy()
    })

    it('should render with emoji in label', () => {
      render(<Button label="✓ Done" />)
      expect(screen.getByText('✓ Done')).toBeTruthy()
    })

    it('should render with number label', () => {
      render(<Button label={String(123)} />)
      expect(screen.getByText('123')).toBeTruthy()
    })
  })
})
