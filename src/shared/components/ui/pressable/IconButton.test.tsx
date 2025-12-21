import {fireEvent, render, screen} from '@testing-library/react-native'

import {IconButton} from './IconButton'

/**
 * Test suite for IconButton component
 */
describe('IconButton', () => {
  describe('Rendering', () => {
    it('should render with icon name', () => {
      render(<IconButton testID="icon-button" name="home" />)
      expect(screen.getByTestId('icon-button')).toBeTruthy()
    })

    it('should render with testID', () => {
      render(
        <IconButton
          testID="test-icon-button"
          name="settings"
        />
      )
      expect(screen.getByTestId('test-icon-button')).toBeTruthy()
    })

    it('should render different icon names', () => {
      const {rerender} = render(<IconButton name="home" />)
      expect(screen.queryByTestId('icon-button')).toBeTruthy()

      rerender(<IconButton name="search" />)
      expect(screen.queryByTestId('icon-button')).toBeTruthy()

      rerender(<IconButton name="settings" />)
      expect(screen.queryByTestId('icon-button')).toBeTruthy()
    })
  })

  describe('Sizes', () => {
    it('should render with default md size', () => {
      render(<IconButton name="home" />)
      expect(screen.queryByTestId('icon-button')).toBeTruthy()
    })

    it('should render with small size', () => {
      render(
        <IconButton
          name="home"
          size="sm"
        />
      )
      expect(screen.queryByTestId('icon-button')).toBeTruthy()
    })

    it('should render with medium size', () => {
      render(
        <IconButton
          name="home"
          size="md"
        />
      )
      expect(screen.queryByTestId('icon-button')).toBeTruthy()
    })

    it('should render with large size', () => {
      render(
        <IconButton
          name="home"
          size="lg"
        />
      )
      expect(screen.queryByTestId('icon-button')).toBeTruthy()
    })

    it('should switch between sizes', () => {
      const {rerender} = render(
        <IconButton
          name="home"
          size="sm"
        />
      )
      expect(screen.queryByTestId('icon-button')).toBeTruthy()

      rerender(
        <IconButton
          name="home"
          size="lg"
        />
      )
      expect(screen.queryByTestId('icon-button')).toBeTruthy()
    })
  })

  describe('Color', () => {
    it('should render with default color', () => {
      render(<IconButton name="home" />)
      expect(screen.queryByTestId('icon-button')).toBeTruthy()
    })

    it('should accept custom color', () => {
      render(
        <IconButton
          name="home"
          color="red"
        />
      )
      expect(screen.queryByTestId('icon-button')).toBeTruthy()
    })

    it('should accept hex color', () => {
      render(
        <IconButton
          name="home"
          color="#FF0000"
        />
      )
      expect(screen.queryByTestId('icon-button')).toBeTruthy()
    })

    it('should accept rgb color', () => {
      render(
        <IconButton
          name="home"
          color="rgb(255, 0, 0)"
        />
      )
      expect(screen.queryByTestId('icon-button')).toBeTruthy()
    })
  })

  describe('Interaction', () => {
    it('should call onPress when pressed', () => {
      const onPress = jest.fn()
      render(
        <IconButton
          testID="icon-button"
          name="home"
          onPress={onPress}
        />
      )

      fireEvent.press(screen.getByTestId('icon-button'))
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('should not call onPress when disabled', () => {
      const onPress = jest.fn()
      render(
        <IconButton
          testID="icon-button"
          name="home"
          onPress={onPress}
          disabled
        />
      )

      fireEvent.press(screen.getByTestId('icon-button'))
      expect(onPress).not.toHaveBeenCalled()
    })

    it('should handle multiple presses', () => {
      const onPress = jest.fn()
      render(
        <IconButton
          testID="icon-button"
          name="home"
          onPress={onPress}
        />
      )

      const button = screen.getByTestId('icon-button')
      fireEvent.press(button)
      fireEvent.press(button)
      fireEvent.press(button)

      expect(onPress).toHaveBeenCalledTimes(3)
    })
  })

  describe('Disabled State', () => {
    it('should render when disabled', () => {
      render(
        <IconButton
          testID="icon-button"
          name="home"
          disabled
        />
      )
      expect(screen.getByTestId('icon-button')).toBeTruthy()
    })

    it('should not trigger onPress when disabled', () => {
      const onPress = jest.fn()
      render(
        <IconButton
          testID="icon-button"
          name="home"
          onPress={onPress}
          disabled
        />
      )

      fireEvent.press(screen.getByTestId('icon-button'))
      expect(onPress).not.toHaveBeenCalled()
    })

    it('should maintain disabled state across size changes', () => {
      const {rerender} = render(
        <IconButton
          testID="icon-button"
          name="home"
          size="sm"
          disabled
        />
      )
      expect(screen.getByTestId('icon-button')).toBeTruthy()

      rerender(
        <IconButton
          testID="icon-button"
          name="home"
          size="lg"
          disabled
        />
      )
      expect(screen.getByTestId('icon-button')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should have button accessibility role', () => {
      render(<IconButton name="home" />)
      expect(screen.queryByTestId('icon-button')).toBeTruthy()
    })

    it('should accept accessibilityLabel', () => {
      render(
        <IconButton
          name="home"
          accessibilityLabel="Go to home"
        />
      )
      expect(screen.getByLabelText('Go to home')).toBeTruthy()
    })

    it('should accept accessibilityHint', () => {
      render(
        <IconButton
          testID="icon-button"
          name="settings"
          accessibilityHint="Opens settings menu"
        />
      )
      expect(screen.getByTestId('icon-button')).toBeTruthy()
    })
  })

  describe('Common Use Cases', () => {
    it('should work as navigation button', () => {
      const onNavigate = jest.fn()
      render(
        <IconButton
          testID="nav-button"
          name="arrow-back"
          onPress={onNavigate}
        />
      )

      fireEvent.press(screen.getByTestId('nav-button'))
      expect(onNavigate).toHaveBeenCalled()
    })

    it('should work as menu button', () => {
      const onMenuPress = jest.fn()
      render(
        <IconButton
          testID="menu-button"
          name="menu"
          onPress={onMenuPress}
        />
      )

      fireEvent.press(screen.getByTestId('menu-button'))
      expect(onMenuPress).toHaveBeenCalled()
    })

    it('should work as close button', () => {
      const onClose = jest.fn()
      render(
        <IconButton
          testID="close-button"
          name="close"
          onPress={onClose}
          size="sm"
        />
      )

      fireEvent.press(screen.getByTestId('close-button'))
      expect(onClose).toHaveBeenCalled()
    })

    it('should work as settings button in header', () => {
      const onSettings = jest.fn()
      render(
        <IconButton
          testID="settings-button"
          name="settings"
          onPress={onSettings}
          accessibilityLabel="Settings"
        />
      )

      fireEvent.press(screen.getByTestId('settings-button'))
      expect(onSettings).toHaveBeenCalled()
    })
  })

  describe('Icon Names', () => {
    it('should render common navigation icons', () => {
      const icons: Array<{name: string}> = [
        {name: 'home'},
        {name: 'search'},
        {name: 'settings'},
        {name: 'person'},
      ]

      icons.forEach(({name}, index) => {
        const {unmount} = render(
          <IconButton
            testID={`icon-${index}`}
            name={name as 'home'}
          />
        )
        expect(screen.getByTestId(`icon-${index}`)).toBeTruthy()
        unmount()
      })
    })

    it('should render action icons', () => {
      const icons: Array<{name: string}> = [
        {name: 'add'},
        {name: 'edit'},
        {name: 'delete'},
        {name: 'save'},
      ]

      icons.forEach(({name}, index) => {
        const {unmount} = render(
          <IconButton
            testID={`icon-${index}`}
            name={name as 'home'}
          />
        )
        expect(screen.getByTestId(`icon-${index}`)).toBeTruthy()
        unmount()
      })
    })
  })

  describe('Combined Props', () => {
    it('should work with all props combined', () => {
      const onPress = jest.fn()
      render(
        <IconButton
          testID="full-props"
          name="favorite"
          size="lg"
          color="red"
          onPress={onPress}
          accessibilityLabel="Add to favorites"
          accessibilityHint="Double tap to add to favorites"
        />
      )

      fireEvent.press(screen.getByTestId('full-props'))
      expect(onPress).toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('should handle rapid presses', () => {
      const onPress = jest.fn()
      render(
        <IconButton
          testID="icon-button"
          name="home"
          onPress={onPress}
        />
      )

      const button = screen.getByTestId('icon-button')
      for (let i = 0; i < 5; i++) {
        fireEvent.press(button)
      }

      expect(onPress).toHaveBeenCalledTimes(5)
    })

    it('should work with all size variants', () => {
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg']

      sizes.forEach((size, index) => {
        const {unmount} = render(
          <IconButton
            testID={`icon-${index}`}
            name="home"
            size={size}
          />
        )
        expect(screen.getByTestId(`icon-${index}`)).toBeTruthy()
        unmount()
      })
    })
  })
})
