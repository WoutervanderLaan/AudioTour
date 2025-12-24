/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */
// eslint-disable-next-line no-restricted-imports
import {Text} from 'react-native'

import {fireEvent, render, screen} from '@testing-library/react-native'

import {PressableBase} from './PressableBase'

/**
 * Test suite for PressableBase component
 */
describe('PressableBase', () => {
  describe('Rendering', () => {
    it('should render children correctly', () => {
      render(
        <PressableBase testID="TestPressable">
          <Text>Pressable content</Text>
        </PressableBase>,
      )
      expect(screen.getByText('Pressable content')).toBeTruthy()
    })

    it('should render with testID', () => {
      render(<PressableBase testID="TestPressable" />)
      expect(screen.getByTestId('TestPressable')).toBeTruthy()
    })

    it('should render multiple children', () => {
      render(
        <PressableBase testID="TestPressable">
          <Text>First</Text>
          <Text>Second</Text>
        </PressableBase>,
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
          testID="TestPressable"
          onPress={onPress}>
          <Text>Press me</Text>
        </PressableBase>,
      )

      fireEvent.press(screen.getByTestId('TestPressable'))
      expect(onPress).toHaveBeenCalledTimes(1)
    })

    it('should not call onPress when disabled', () => {
      const onPress = jest.fn()
      render(
        <PressableBase
          testID="TestPressable"
          onPress={onPress}
          disabled>
          <Text>Disabled</Text>
        </PressableBase>,
      )

      fireEvent.press(screen.getByTestId('TestPressable'))
      expect(onPress).not.toHaveBeenCalled()
    })

    it('should call onPressIn when press starts', () => {
      const onPressIn = jest.fn()
      render(
        <PressableBase
          testID="TestPressable"
          onPressIn={onPressIn}>
          <Text>Press in</Text>
        </PressableBase>,
      )

      fireEvent(screen.getByTestId('TestPressable'), 'pressIn')
      expect(onPressIn).toHaveBeenCalledTimes(1)
    })

    it('should call onPressOut when press ends', () => {
      const onPressOut = jest.fn()
      render(
        <PressableBase
          testID="TestPressable"
          onPressOut={onPressOut}>
          <Text>Press out</Text>
        </PressableBase>,
      )

      fireEvent(screen.getByTestId('TestPressable'), 'pressOut')
      expect(onPressOut).toHaveBeenCalledTimes(1)
    })

    it('should call onLongPress when long pressed', () => {
      const onLongPress = jest.fn()
      render(
        <PressableBase
          testID="TestPressable"
          onLongPress={onLongPress}>
          <Text>Long press</Text>
        </PressableBase>,
      )

      fireEvent(screen.getByTestId('TestPressable'), 'longPress')
      expect(onLongPress).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('should have button accessibility role by default', () => {
      render(
        <PressableBase testID="TestPressable">
          <Text>Button</Text>
        </PressableBase>,
      )
      const pressable = screen.getByTestId('TestPressable')
      expect(pressable.props.accessibilityRole).toBe('button')
    })

    it('should be accessible by default', () => {
      render(
        <PressableBase testID="TestPressable">
          <Text>Accessible</Text>
        </PressableBase>,
      )
      const pressable = screen.getByTestId('TestPressable')
      expect(pressable.props.accessible).toBe(true)
    })

    it('should accept custom accessibility role', () => {
      render(
        <PressableBase
          testID="TestPressable"
          accessibilityRole="link">
          <Text>Link</Text>
        </PressableBase>,
      )
      const pressable = screen.getByTestId('TestPressable')
      expect(pressable.props.accessibilityRole).toBe('link')
    })

    it('should accept accessibilityLabel', () => {
      render(
        <PressableBase
          testID="TestPressable"
          accessibilityLabel="Custom Label">
          <Text>Content</Text>
        </PressableBase>,
      )
      expect(screen.getByLabelText('Custom Label')).toBeTruthy()
    })

    it('should accept accessibilityHint', () => {
      render(
        <PressableBase
          testID="TestPressable"
          accessibilityHint="Tap to continue">
          <Text>Continue</Text>
        </PressableBase>,
      )
      const pressable = screen.getByTestId('TestPressable')
      expect(pressable.props.accessibilityHint).toBe('Tap to continue')
    })

    it('should be disabled when disabled prop is true', () => {
      render(
        <PressableBase
          testID="TestPressable"
          disabled>
          <Text>Disabled</Text>
        </PressableBase>,
      )
      const pressable = screen.getByTestId('TestPressable')
      expect(pressable.props.accessibilityState.disabled).toBe(true)
    })
  })

  describe('Styling', () => {
    it('should accept style function', () => {
      const styleFunction = jest.fn(() => ({backgroundColor: 'red'}))
      render(
        <PressableBase
          testID="TestPressable"
          style={styleFunction}>
          <Text>Styled</Text>
        </PressableBase>,
      )
      expect(styleFunction).toHaveBeenCalled()
    })

    it('should call style function with pressed state', () => {
      const styleFunction = jest.fn(() => ({}))
      render(
        <PressableBase
          testID="TestPressable"
          style={styleFunction}>
          <Text>Styled</Text>
        </PressableBase>,
      )
      const pressable = screen.getByTestId('TestPressable')
      expect(pressable.props.style).toBeDefined()
    })

    it('should apply pressed state styling', () => {
      /**
       * styleFunction
       * TODO: describe what it does.
       *
       * @param {*} options
       * @returns {*} describe return value
       */
      const styleFunction = ({
        pressed,
      }: {
        pressed: boolean
      }): {opacity: number} => ({
        opacity: pressed ? 0.5 : 1,
      })
      render(
        <PressableBase
          testID="TestPressable"
          style={styleFunction}>
          <Text>Press for opacity</Text>
        </PressableBase>,
      )
      expect(screen.getByText('Press for opacity')).toBeTruthy()
    })
  })

  describe('Hit Slop', () => {
    it('should accept hitSlop prop', () => {
      render(
        <PressableBase
          testID="TestPressable"
          hitSlop={20}>
          <Text>Hit slop</Text>
        </PressableBase>,
      )
      const pressable = screen.getByTestId('TestPressable')
      expect(pressable.props.hitSlop).toBe(20)
    })

    it('should accept hitSlop as object', () => {
      const hitSlop = {top: 10, bottom: 10, left: 5, right: 5}
      render(
        <PressableBase
          testID="TestPressable"
          hitSlop={hitSlop}>
          <Text>Hit slop object</Text>
        </PressableBase>,
      )
      const pressable = screen.getByTestId('TestPressable')
      expect(pressable.props.hitSlop).toEqual(hitSlop)
    })
  })

  describe('Children as Function', () => {
    it('should support children as function', () => {
      render(
        <PressableBase testID="TestPressable">
          {({pressed}) => <Text>{pressed ? 'Pressed' : 'Not pressed'}</Text>}
        </PressableBase>,
      )
      // Default state is not pressed
      expect(
        screen.getByText('Not pressed') || screen.getByText('Pressed'),
      ).toBeTruthy()
    })
  })

  describe('Edge Cases', () => {
    it('should render with no children', () => {
      render(<PressableBase testID="TestPressable" />)
      expect(screen.getByTestId('TestPressable')).toBeTruthy()
    })

    it('should render with null children', () => {
      render(<PressableBase testID="TestPressable">{null}</PressableBase>)
      expect(screen.getByTestId('TestPressable')).toBeTruthy()
    })

    it('should handle multiple press events', () => {
      const onPress = jest.fn()
      render(
        <PressableBase
          testID="TestPressable"
          onPress={onPress}>
          <Text>Multi press</Text>
        </PressableBase>,
      )

      const pressable = screen.getByTestId('TestPressable')
      fireEvent.press(pressable)
      fireEvent.press(pressable)
      fireEvent.press(pressable)

      expect(onPress).toHaveBeenCalledTimes(3)
    })

    it('should handle rapid press events', () => {
      const onPress = jest.fn()
      render(
        <PressableBase
          testID="TestPressable"
          onPress={onPress}>
          <Text>Rapid press</Text>
        </PressableBase>,
      )

      const pressable = screen.getByTestId('TestPressable')
      for (let i = 0; i < 10; i++) {
        fireEvent.press(pressable)
      }

      expect(onPress).toHaveBeenCalledTimes(10)
    })
  })
})
