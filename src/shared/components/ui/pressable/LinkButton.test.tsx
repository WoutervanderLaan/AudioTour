/* eslint-disable max-lines-per-function */
import {fireEvent, render, screen} from '@testing-library/react-native'

import {LinkButton} from './LinkButton'

/**
 * Test suite for LinkButton component
 */
describe('LinkButton', () => {
  describe('Rendering', () => {
    it('should render label correctly', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Click here"
        />,
      )
      expect(screen.getByText('Click here')).toBeTruthy()
    })

    it('should render with testID', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Test Link"
        />,
      )
      expect(screen.getByTestId('TestLinkButtonPressable')).toBeTruthy()
    })

    it('should render with default props', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Link"
        />,
      )
      expect(screen.getByText('Link')).toBeTruthy()
    })
  })

  describe('Text Variants', () => {
    it('should render with default Paragraph variant', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Paragraph Link"
        />,
      )
      expect(screen.getByText('Paragraph Link')).toBeTruthy()
    })

    it('should accept Label text variant', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Label Link"
          textVariant="Label"
        />,
      )
      expect(screen.getByText('Label Link')).toBeTruthy()
    })

    it('should accept Title text variant', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Title Link"
          textVariant="Title"
        />,
      )
      expect(screen.getByText('Title Link')).toBeTruthy()
    })
  })

  describe('Paragraph Variants', () => {
    it('should render with default body variant', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Body Link"
        />,
      )
      expect(screen.getByText('Body Link')).toBeTruthy()
    })

    it('should render with small variant', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Small Link"
          variant="small"
        />,
      )
      expect(screen.getByText('Small Link')).toBeTruthy()
    })

    it('should render with extraSmall variant', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Extra Small Link"
          variant="extraSmall"
        />,
      )
      expect(screen.getByText('Extra Small Link')).toBeTruthy()
    })

    it('should render with intro variant', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Intro Link"
          variant="intro"
        />,
      )
      expect(screen.getByText('Intro Link')).toBeTruthy()
    })

    it('should render with quote variant', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Quote Link"
          variant="quote"
        />,
      )
      expect(screen.getByText('Quote Link')).toBeTruthy()
    })
  })

  describe('Interaction', () => {
    it('should call onPress when pressed', () => {
      const onPress = jest.fn()
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Press me"
          onPress={onPress}
        />,
      )

      fireEvent.press(screen.getByTestId('TestLinkButtonPressable'))
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('should not call onPress when disabled', () => {
      const onPress = jest.fn()
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Disabled Link"
          onPress={onPress}
          disabled
        />,
      )

      fireEvent.press(screen.getByTestId('TestLinkButtonPressable'))
      expect(onPress).not.toHaveBeenCalled()
    })

    it('should handle multiple presses', () => {
      const onPress = jest.fn()
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Multi press"
          onPress={onPress}
        />,
      )

      const link = screen.getByTestId('TestLinkButtonPressable')
      fireEvent.press(link)
      fireEvent.press(link)
      fireEvent.press(link)

      expect(onPress).toHaveBeenCalledTimes(3)
    })
  })

  describe('Disabled State', () => {
    it('should render when disabled', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Disabled Link"
          disabled
        />,
      )
      expect(screen.getByText('Disabled Link')).toBeTruthy()
    })

    it('should not trigger onPress when disabled', () => {
      const onPress = jest.fn()
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Disabled"
          onPress={onPress}
          disabled
        />,
      )

      fireEvent.press(screen.getByTestId('TestLinkButtonPressable'))
      expect(onPress).not.toHaveBeenCalled()
    })

    it('should maintain disabled state across variant changes', () => {
      const {rerender} = render(
        <LinkButton
          testID="TestLinkButton"
          label="Link"
          variant="body"
          disabled
        />,
      )
      expect(screen.getByText('Link')).toBeTruthy()

      rerender(
        <LinkButton
          testID="TestLinkButton"
          label="Link"
          variant="small"
          disabled
        />,
      )
      expect(screen.getByText('Link')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should have button accessibility role', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Accessible Link"
        />,
      )
      expect(screen.getByText('Accessible Link')).toBeTruthy()
    })

    it('should accept accessibilityLabel', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Sign up"
          accessibilityLabel="Sign up for an account"
        />,
      )
      expect(screen.getByLabelText('Sign up for an account')).toBeTruthy()
    })

    it('should accept accessibilityHint', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Learn more"
          accessibilityHint="Opens details page"
        />,
      )
      expect(screen.getByTestId('TestLinkButtonPressable')).toBeTruthy()
    })
  })

  describe('Common Use Cases', () => {
    it('should work as sign up link', () => {
      const onSignUp = jest.fn()
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Sign up"
          onPress={onSignUp}
        />,
      )

      fireEvent.press(screen.getByTestId('TestLinkButtonPressable'))
      expect(onSignUp).toHaveBeenCalled()
    })

    it('should work as forgot password link', () => {
      const onForgotPassword = jest.fn()
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Forgot password?"
          variant="small"
          onPress={onForgotPassword}
        />,
      )

      fireEvent.press(screen.getByTestId('TestLinkButtonPressable'))
      expect(onForgotPassword).toHaveBeenCalled()
    })

    it('should work as terms and conditions link', () => {
      const onTerms = jest.fn()
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Terms and Conditions"
          variant="extraSmall"
          onPress={onTerms}
        />,
      )

      fireEvent.press(screen.getByTestId('TestLinkButtonPressable'))
      expect(onTerms).toHaveBeenCalled()
    })

    it('should work as navigation link', () => {
      const onNavigate = jest.fn()
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Go to profile"
          onPress={onNavigate}
        />,
      )

      fireEvent.press(screen.getByTestId('TestLinkButtonPressable'))
      expect(onNavigate).toHaveBeenCalled()
    })

    it('should work as learn more link', () => {
      const onLearnMore = jest.fn()
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Learn more →"
          onPress={onLearnMore}
        />,
      )

      fireEvent.press(screen.getByTestId('TestLinkButtonPressable'))
      expect(onLearnMore).toHaveBeenCalled()
    })
  })

  describe('Text Styling', () => {
    it('should use link color by default', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Link Color"
        />,
      )
      expect(screen.getByText('Link Color')).toBeTruthy()
    })

    it('should apply custom color from props', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Custom Color"
          color="link"
        />,
      )
      expect(screen.getByText('Custom Color')).toBeTruthy()
    })
  })

  describe('Long Labels', () => {
    it('should render with long label', () => {
      const longLabel = 'This is a very long link label that might wrap'
      render(
        <LinkButton
          testID="TestLinkButton"
          label={longLabel}
        />,
      )
      expect(screen.getByText(longLabel)).toBeTruthy()
    })

    it('should render with single word label', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Link"
        />,
      )
      expect(screen.getByText('Link')).toBeTruthy()
    })

    it('should render with empty string label', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label=""
        />,
      )
      expect(screen.queryByText('')).toBeTruthy()
    })
  })

  describe('Combined Props', () => {
    it('should work with all props combined', () => {
      const onPress = jest.fn()
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Full Props Link"
          textVariant="Paragraph"
          variant="small"
          onPress={onPress}
          accessibilityLabel="Complete link"
          accessibilityHint="Navigates to page"
        />,
      )

      fireEvent.press(screen.getByTestId('TestLinkButtonPressable'))
      expect(onPress).toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('should render with special characters in label', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Terms & Conditions"
        />,
      )
      expect(screen.getByText('Terms & Conditions')).toBeTruthy()
    })

    it('should render with emoji in label', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Learn more →"
        />,
      )
      expect(screen.getByText('Learn more →')).toBeTruthy()
    })

    it('should render with number label', () => {
      render(
        <LinkButton
          testID="TestLinkButton"
          label={String(123)}
        />,
      )
      expect(screen.getByText('123')).toBeTruthy()
    })

    it('should handle rapid presses', () => {
      const onPress = jest.fn()
      render(
        <LinkButton
          testID="TestLinkButton"
          label="Rapid"
          onPress={onPress}
        />,
      )

      const link = screen.getByTestId('TestLinkButtonPressable')
      for (let i = 0; i < 5; i++) {
        fireEvent.press(link)
      }

      expect(onPress).toHaveBeenCalledTimes(5)
    })
  })
})
