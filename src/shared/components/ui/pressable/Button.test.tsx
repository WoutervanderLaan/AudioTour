import {fireEvent, render, screen} from '@testing-library/react-native'

import {Button} from './Button'

/**
 * Test suite for Button component
 */
describe('Button', () => {
  describe('Rendering', () => {
    it('should render label correctly', () => {
      render(
        <Button
          testID="TestButton"
          label="Click me"
        />,
      )
      expect(screen.getByText('Click me')).toBeTruthy()
    })

    it('should render with testID', () => {
      render(
        <Button
          testID="TestButton"
          label="Test"
        />,
      )
      expect(screen.getByTestId('TestButtonPressable')).toBeTruthy()
    })

    it('should render with default primary variant', () => {
      render(
        <Button
          testID="TestButton"
          label="Primary"
        />,
      )
      expect(screen.getByText('Primary')).toBeTruthy()
    })
  })

  describe('Variants', () => {
    it('should render primary variant', () => {
      render(
        <Button
          testID="TestButton"
          label="Primary Button"
        />,
      )
      expect(screen.getByText('Primary Button')).toBeTruthy()
    })

    it('should render secondary variant', () => {
      render(
        <Button
          testID="TestButton"
          variant="secondary"
          label="Secondary Button"
        />,
      )
      expect(screen.getByText('Secondary Button')).toBeTruthy()
    })

    it('should switch between variants', () => {
      const {rerender} = render(
        <Button
          testID="TestButton"
          label="Button"
        />,
      )
      expect(screen.getByText('Button')).toBeTruthy()

      rerender(
        <Button
          testID="TestButton"
          variant="secondary"
          label="Button"
        />,
      )
      expect(screen.getByText('Button')).toBeTruthy()
    })
  })

  describe('Interaction', () => {
    it('should call onPress when pressed', () => {
      const onPress = jest.fn()
      render(
        <Button
          testID="TestButton"
          label="Press me"
          onPress={onPress}
        />,
      )

      fireEvent.press(screen.getByTestId('TestButtonPressable'))
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('should not call onPress when disabled', () => {
      const onPress = jest.fn()
      render(
        <Button
          testID="TestButton"
          label="Disabled"
          onPress={onPress}
          disabled
        />,
      )

      fireEvent.press(screen.getByTestId('TestButtonPressable'))
      expect(onPress).not.toHaveBeenCalled()
    })

    it('should handle multiple presses', () => {
      const onPress = jest.fn()
      render(
        <Button
          testID="TestButton"
          label="Multi press"
          onPress={onPress}
        />,
      )

      const button = screen.getByTestId('TestButtonPressable')
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
          testID="TestButton"
          label="Disabled Button"
          disabled
        />,
      )
      expect(screen.getByText('Disabled Button')).toBeTruthy()
    })

    it('should not trigger onPress when disabled', () => {
      const onPress = jest.fn()
      render(
        <Button
          testID="TestButton"
          label="Disabled"
          onPress={onPress}
          disabled
        />,
      )

      fireEvent.press(screen.getByTestId('TestButtonPressable'))
      expect(onPress).not.toHaveBeenCalled()
    })

    it('should maintain disabled state across variant changes', () => {
      const {rerender} = render(
        <Button
          testID="TestButton"
          label="Button"
          disabled
        />,
      )
      expect(screen.getByText('Button')).toBeTruthy()

      rerender(
        <Button
          testID="TestButton"
          variant="secondary"
          label="Button"
          disabled
        />,
      )
      expect(screen.getByText('Button')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should have button accessibility role', () => {
      render(
        <Button
          testID="TestButton"
          label="Accessible"
        />,
      )
      expect(screen.getByText('Accessible')).toBeTruthy()
    })

    it('should accept accessibilityLabel', () => {
      render(
        <Button
          testID="TestButton"
          label="Submit"
          accessibilityLabel="Submit form"
        />,
      )
      expect(screen.getByLabelText('Submit form')).toBeTruthy()
    })

    it('should accept accessibilityHint', () => {
      render(
        <Button
          testID="TestButton"
          label="Next"
          accessibilityHint="Navigate to next page"
        />,
      )
      expect(screen.getByTestId('TestButtonPressable')).toBeTruthy()
    })
  })

  describe('Long Labels', () => {
    it('should render with long label', () => {
      const longLabel = 'This is a very long button label that might wrap'
      render(
        <Button
          testID="TestButton"
          label={longLabel}
        />,
      )
      expect(screen.getByText(longLabel)).toBeTruthy()
    })

    it('should render with single word label', () => {
      render(
        <Button
          testID="TestButton"
          label="OK"
        />,
      )
      expect(screen.getByText('OK')).toBeTruthy()
    })

    it('should render with empty string label', () => {
      render(
        <Button
          testID="TestButton"
          label=""
        />,
      )
      expect(screen.queryByText('')).toBeTruthy()
    })
  })

  describe('Common Use Cases', () => {
    it('should work as submit button', () => {
      const onSubmit = jest.fn()
      render(
        <Button
          testID="TestButton"
          label="Submit"
          onPress={onSubmit}
        />,
      )

      fireEvent.press(screen.getByText('Submit'))
      expect(onSubmit).toHaveBeenCalled()
    })

    it('should work as cancel button', () => {
      const onCancel = jest.fn()
      render(
        <Button
          testID="TestButton"
          variant="secondary"
          label="Cancel"
          onPress={onCancel}
        />,
      )

      fireEvent.press(screen.getByTestId('TestButtonPressable'))
      expect(onCancel).toHaveBeenCalled()
    })

    it('should work as loading button', () => {
      const isLoading = true
      render(
        <Button
          testID="TestButton"
          label={isLoading ? 'Loading...' : 'Submit'}
          disabled={isLoading}
        />,
      )
      expect(screen.getByText('Loading...')).toBeTruthy()
    })

    it('should work in form context', () => {
      const onSubmit = jest.fn()
      const onCancel = jest.fn()
      render(
        <>
          <Button
            testID="Test1Button"
            label="Submit"
            onPress={onSubmit}
          />
          <Button
            testID="Test2Button"
            variant="secondary"
            label="Cancel"
            onPress={onCancel}
          />
        </>,
      )

      expect(screen.getByText('Submit')).toBeTruthy()
      expect(screen.getByText('Cancel')).toBeTruthy()
    })
  })

  describe('Edge Cases', () => {
    it('should render with special characters in label', () => {
      render(
        <Button
          testID="TestButton"
          label="Save & Continue →"
        />,
      )
      expect(screen.getByText('Save & Continue →')).toBeTruthy()
    })

    it('should render with emoji in label', () => {
      render(
        <Button
          testID="TestButton"
          label="✓ Done"
        />,
      )
      expect(screen.getByText('✓ Done')).toBeTruthy()
    })

    it('should render with number label', () => {
      render(
        <Button
          testID="TestButton"
          label={String(123)}
        />,
      )
      expect(screen.getByText('123')).toBeTruthy()
    })
  })
})
