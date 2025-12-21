import {fireEvent, render, screen} from '@testing-library/react-native'

import {LinkButton} from './LinkButton'

/**
 * Test suite for LinkButton component
 */
describe('LinkButton', () => {
  describe('Rendering', () => {
    it('should render label correctly', () => {
      render(<LinkButton label="Click here" />)
      expect(screen.getByText('Click here')).toBeTruthy()
    })

    it('should render with testID', () => {
      render(
        <LinkButton
          testID="test-link"
          label="Test Link"
        />
      )
      expect(screen.getByTestId('test-link')).toBeTruthy()
    })

    it('should render with default props', () => {
      render(<LinkButton label="Link" />)
      expect(screen.getByText('Link')).toBeTruthy()
    })
  })

  describe('Text Variants', () => {
    it('should render with default Paragraph variant', () => {
      render(<LinkButton label="Paragraph Link" />)
      expect(screen.getByText('Paragraph Link')).toBeTruthy()
    })

    it('should accept Label text variant', () => {
      render(
        <LinkButton
          label="Label Link"
          textVariant="Label"
        />
      )
      expect(screen.getByText('Label Link')).toBeTruthy()
    })

    it('should accept Title text variant', () => {
      render(
        <LinkButton
          label="Title Link"
          textVariant="Title"
        />
      )
      expect(screen.getByText('Title Link')).toBeTruthy()
    })
  })

  describe('Paragraph Variants', () => {
    it('should render with default body variant', () => {
      render(<LinkButton label="Body Link" />)
      expect(screen.getByText('Body Link')).toBeTruthy()
    })

    it('should render with small variant', () => {
      render(
        <LinkButton
          label="Small Link"
          variant="small"
        />
      )
      expect(screen.getByText('Small Link')).toBeTruthy()
    })

    it('should render with extraSmall variant', () => {
      render(
        <LinkButton
          label="Extra Small Link"
          variant="extraSmall"
        />
      )
      expect(screen.getByText('Extra Small Link')).toBeTruthy()
    })

    it('should render with intro variant', () => {
      render(
        <LinkButton
          label="Intro Link"
          variant="intro"
        />
      )
      expect(screen.getByText('Intro Link')).toBeTruthy()
    })

    it('should render with quote variant', () => {
      render(
        <LinkButton
          label="Quote Link"
          variant="quote"
        />
      )
      expect(screen.getByText('Quote Link')).toBeTruthy()
    })
  })

  describe('Interaction', () => {
    it('should call onPress when pressed', () => {
      const onPress = jest.fn()
      render(
        <LinkButton
          testID="link"
          label="Press me"
          onPress={onPress}
        />
      )

      fireEvent.press(screen.getByTestId('link'))
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('should not call onPress when disabled', () => {
      const onPress = jest.fn()
      render(
        <LinkButton
          testID="link"
          label="Disabled Link"
          onPress={onPress}
          disabled
        />
      )

      fireEvent.press(screen.getByTestId('link'))
      expect(onPress).not.toHaveBeenCalled()
    })

    it('should handle multiple presses', () => {
      const onPress = jest.fn()
      render(
        <LinkButton
          testID="link"
          label="Multi press"
          onPress={onPress}
        />
      )

      const link = screen.getByTestId('link')
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
          label="Disabled Link"
          disabled
        />
      )
      expect(screen.getByText('Disabled Link')).toBeTruthy()
    })

    it('should not trigger onPress when disabled', () => {
      const onPress = jest.fn()
      render(
        <LinkButton
          testID="link"
          label="Disabled"
          onPress={onPress}
          disabled
        />
      )

      fireEvent.press(screen.getByTestId('link'))
      expect(onPress).not.toHaveBeenCalled()
    })

    it('should maintain disabled state across variant changes', () => {
      const {rerender} = render(
        <LinkButton
          label="Link"
          variant="body"
          disabled
        />
      )
      expect(screen.getByText('Link')).toBeTruthy()

      rerender(
        <LinkButton
          label="Link"
          variant="small"
          disabled
        />
      )
      expect(screen.getByText('Link')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should have button accessibility role', () => {
      render(<LinkButton label="Accessible Link" />)
      expect(screen.getByText('Accessible Link')).toBeTruthy()
    })

    it('should accept accessibilityLabel', () => {
      render(
        <LinkButton
          label="Sign up"
          accessibilityLabel="Sign up for an account"
        />
      )
      expect(screen.getByLabelText('Sign up for an account')).toBeTruthy()
    })

    it('should accept accessibilityHint', () => {
      render(
        <LinkButton
          testID="link"
          label="Learn more"
          accessibilityHint="Opens details page"
        />
      )
      expect(screen.getByTestId('link')).toBeTruthy()
    })
  })

  describe('Common Use Cases', () => {
    it('should work as sign up link', () => {
      const onSignUp = jest.fn()
      render(
        <LinkButton
          testID="signup"
          label="Sign up"
          onPress={onSignUp}
        />
      )

      fireEvent.press(screen.getByTestId('signup'))
      expect(onSignUp).toHaveBeenCalled()
    })

    it('should work as forgot password link', () => {
      const onForgotPassword = jest.fn()
      render(
        <LinkButton
          testID="forgot-password"
          label="Forgot password?"
          variant="small"
          onPress={onForgotPassword}
        />
      )

      fireEvent.press(screen.getByTestId('forgot-password'))
      expect(onForgotPassword).toHaveBeenCalled()
    })

    it('should work as terms and conditions link', () => {
      const onTerms = jest.fn()
      render(
        <LinkButton
          testID="terms"
          label="Terms and Conditions"
          variant="extraSmall"
          onPress={onTerms}
        />
      )

      fireEvent.press(screen.getByTestId('terms'))
      expect(onTerms).toHaveBeenCalled()
    })

    it('should work as navigation link', () => {
      const onNavigate = jest.fn()
      render(
        <LinkButton
          testID="nav-link"
          label="Go to profile"
          onPress={onNavigate}
        />
      )

      fireEvent.press(screen.getByTestId('nav-link'))
      expect(onNavigate).toHaveBeenCalled()
    })

    it('should work as learn more link', () => {
      const onLearnMore = jest.fn()
      render(
        <LinkButton
          testID="learn-more"
          label="Learn more →"
          onPress={onLearnMore}
        />
      )

      fireEvent.press(screen.getByTestId('learn-more'))
      expect(onLearnMore).toHaveBeenCalled()
    })
  })

  describe('Text Styling', () => {
    it('should use link color by default', () => {
      render(<LinkButton label="Link Color" />)
      expect(screen.getByText('Link Color')).toBeTruthy()
    })

    it('should apply custom color from props', () => {
      render(
        <LinkButton
          label="Custom Color"
          color="primary"
        />
      )
      expect(screen.getByText('Custom Color')).toBeTruthy()
    })
  })

  describe('Long Labels', () => {
    it('should render with long label', () => {
      const longLabel = 'This is a very long link label that might wrap'
      render(<LinkButton label={longLabel} />)
      expect(screen.getByText(longLabel)).toBeTruthy()
    })

    it('should render with single word label', () => {
      render(<LinkButton label="Link" />)
      expect(screen.getByText('Link')).toBeTruthy()
    })

    it('should render with empty string label', () => {
      render(<LinkButton label="" />)
      expect(screen.queryByText('')).toBeTruthy()
    })
  })

  describe('Combined Props', () => {
    it('should work with all props combined', () => {
      const onPress = jest.fn()
      render(
        <LinkButton
          testID="full-props"
          label="Full Props Link"
          textVariant="Paragraph"
          variant="small"
          onPress={onPress}
          accessibilityLabel="Complete link"
          accessibilityHint="Navigates to page"
        />
      )

      fireEvent.press(screen.getByTestId('full-props'))
      expect(onPress).toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('should render with special characters in label', () => {
      render(<LinkButton label="Terms & Conditions" />)
      expect(screen.getByText('Terms & Conditions')).toBeTruthy()
    })

    it('should render with emoji in label', () => {
      render(<LinkButton label="Learn more →" />)
      expect(screen.getByText('Learn more →')).toBeTruthy()
    })

    it('should render with number label', () => {
      render(<LinkButton label={String(123)} />)
      expect(screen.getByText('123')).toBeTruthy()
    })

    it('should handle rapid presses', () => {
      const onPress = jest.fn()
      render(
        <LinkButton
          testID="link"
          label="Rapid"
          onPress={onPress}
        />
      )

      const link = screen.getByTestId('link')
      for (let i = 0; i < 5; i++) {
        fireEvent.press(link)
      }

      expect(onPress).toHaveBeenCalledTimes(5)
    })
  })
})
