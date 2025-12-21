import {fireEvent, render, screen} from '@testing-library/react-native'
import {Text} from 'react-native'

import {PressableBase} from './PressableBase'

/**
 * Test suite for PressableBase component
 */
describe('PressableBase', () => {
  describe('Rendering', () => {
    it('should render children correctly', () => {
      render(
        <PressableBase>
          <Text>Pressable content</Text>
        </PressableBase>
      )
      expect(screen.getByText('Pressable content')).toBeTruthy()
    })

    it('should render with testID', () => {
      render(<PressableBase testID="test-pressable" />)
      expect(screen.getByTestId('test-pressable')).toBeTruthy()
    })

    it('should render multiple children', () => {
      render(
        <PressableBase>
          <Text>First</Text>
          <Text>Second</Text>
        </PressableBase>
      )
      expect(screen.getByText('First')).toBeTruthy()
      expect(screen.getByText('Second')).toBeTruthy()
    })
  })

  describe('Interaction', () => {
    it('should call onPress when pressed', () => {
      const onPress = jest.fn()
      render(
        <PressableBase
          testID="pressable"
          onPress={onPress}>
          <Text>Press me</Text>
        </PressableBase>
      )

      fireEvent.press(screen.getByTestId('pressable'))
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('should not call onPress when disabled', () => {
      const onPress = jest.fn()
      render(
        <PressableBase
          testID="pressable"
          onPress={onPress}
          disabled>
          <Text>Disabled</Text>
        </PressableBase>
      )

      fireEvent.press(screen.getByTestId('pressable'))
      expect(onPress).not.toHaveBeenCalled()
    })

    it('should call onPressIn when press starts', () => {
      const onPressIn = jest.fn()
      render(
        <PressableBase
          testID="pressable"
          onPressIn={onPressIn}>
          <Text>Press in</Text>
        </PressableBase>
      )

      fireEvent(screen.getByTestId('pressable'), 'pressIn')
      expect(onPressIn).toHaveBeenCalledTimes(1)
    })

    it('should call onPressOut when press ends', () => {
      const onPressOut = jest.fn()
      render(
        <PressableBase
          testID="pressable"
          onPressOut={onPressOut}>
          <Text>Press out</Text>
        </PressableBase>
      )

      fireEvent(screen.getByTestId('pressable'), 'pressOut')
      expect(onPressOut).toHaveBeenCalledTimes(1)
    })

    it('should call onLongPress when long pressed', () => {
      const onLongPress = jest.fn()
      render(
        <PressableBase
          testID="pressable"
          onLongPress={onLongPress}>
          <Text>Long press</Text>
        </PressableBase>
      )

      fireEvent(screen.getByTestId('pressable'), 'longPress')
      expect(onLongPress).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('should have button accessibility role by default', () => {
      render(
        <PressableBase testID="pressable">
          <Text>Button</Text>
        </PressableBase>
      )
      const pressable = screen.getByTestId('pressable')
      expect(pressable.props.accessibilityRole).toBe('button')
    })

    it('should be accessible by default', () => {
      render(
        <PressableBase testID="pressable">
          <Text>Accessible</Text>
        </PressableBase>
      )
      const pressable = screen.getByTestId('pressable')
      expect(pressable.props.accessible).toBe(true)
    })

    it('should accept custom accessibility role', () => {
      render(
        <PressableBase testID="pressable" accessibilityRole="link">
          <Text>Link</Text>
        </PressableBase>
      )
      const pressable = screen.getByTestId('pressable')
      expect(pressable.props.accessibilityRole).toBe('link')
    })

    it('should accept accessibilityLabel', () => {
      render(
        <PressableBase
          testID="pressable"
          accessibilityLabel="Custom Label">
          <Text>Content</Text>
        </PressableBase>
      )
      expect(screen.getByLabelText('Custom Label')).toBeTruthy()
    })

    it('should accept accessibilityHint', () => {
      render(
        <PressableBase testID="pressable" accessibilityHint="Tap to continue">
          <Text>Continue</Text>
        </PressableBase>
      )
      const pressable = screen.getByTestId('pressable')
      expect(pressable.props.accessibilityHint).toBe('Tap to continue')
    })

    it('should be disabled when disabled prop is true', () => {
      render(
        <PressableBase testID="pressable" disabled>
          <Text>Disabled</Text>
        </PressableBase>
      )
      const pressable = screen.getByTestId('pressable')
      expect(pressable.props.disabled).toBe(true)
    })
  })

  describe('Styling', () => {
    it('should accept style function', () => {
      const styleFunction = jest.fn(() => ({backgroundColor: 'red'}))
      render(
        <PressableBase testID="pressable" style={styleFunction}>
          <Text>Styled</Text>
        </PressableBase>
      )
      expect(styleFunction).toHaveBeenCalled()
    })

    it('should call style function with pressed state', () => {
      const styleFunction = jest.fn(() => ({}))
      render(
        <PressableBase testID="pressable" style={styleFunction}>
          <Text>Styled</Text>
        </PressableBase>
      )
      const pressable = screen.getByTestId('pressable')
      expect(pressable.props.style).toBeDefined()
    })

    it('should apply pressed state styling', () => {
      const styleFunction = ({pressed}: {pressed: boolean}) => ({
        opacity: pressed ? 0.5 : 1,
      })
      render(
        <PressableBase testID="pressable" style={styleFunction}>
          <Text>Press for opacity</Text>
        </PressableBase>
      )
      expect(screen.getByText('Press for opacity')).toBeTruthy()
    })
  })

  describe('Hit Slop', () => {
    it('should accept hitSlop prop', () => {
      render(
        <PressableBase testID="pressable" hitSlop={20}>
          <Text>Hit slop</Text>
        </PressableBase>
      )
      const pressable = screen.getByTestId('pressable')
      expect(pressable.props.hitSlop).toBe(20)
    })

    it('should accept hitSlop as object', () => {
      const hitSlop = {top: 10, bottom: 10, left: 5, right: 5}
      render(
        <PressableBase testID="pressable" hitSlop={hitSlop}>
          <Text>Hit slop object</Text>
        </PressableBase>
      )
      const pressable = screen.getByTestId('pressable')
      expect(pressable.props.hitSlop).toEqual(hitSlop)
    })
  })

  describe('Children as Function', () => {
    it('should support children as function', () => {
      render(
        <PressableBase testID="pressable">
          {({pressed}) => <Text>{pressed ? 'Pressed' : 'Not pressed'}</Text>}
        </PressableBase>
      )
      // Default state is not pressed
      expect(
        screen.getByText('Not pressed') || screen.getByText('Pressed')
      ).toBeTruthy()
    })
  })

  describe('Edge Cases', () => {
    it('should render with no children', () => {
      render(<PressableBase testID="pressable" />)
      expect(screen.getByTestId('pressable')).toBeTruthy()
    })

    it('should render with null children', () => {
      render(<PressableBase testID="pressable">{null}</PressableBase>)
      expect(screen.getByTestId('pressable')).toBeTruthy()
    })

    it('should handle multiple press events', () => {
      const onPress = jest.fn()
      render(
        <PressableBase
          testID="pressable"
          onPress={onPress}>
          <Text>Multi press</Text>
        </PressableBase>
      )

      const pressable = screen.getByTestId('pressable')
      fireEvent.press(pressable)
      fireEvent.press(pressable)
      fireEvent.press(pressable)

      expect(onPress).toHaveBeenCalledTimes(3)
    })

    it('should handle rapid press events', () => {
      const onPress = jest.fn()
      render(
        <PressableBase
          testID="pressable"
          onPress={onPress}>
          <Text>Rapid press</Text>
        </PressableBase>
      )

      const pressable = screen.getByTestId('pressable')
      for (let i = 0; i < 10; i++) {
        fireEvent.press(pressable)
      }

      expect(onPress).toHaveBeenCalledTimes(10)
    })
  })
})
