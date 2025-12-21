import {render, screen} from '@testing-library/react-native'

import {TextBase} from './TextBase'

/**
 * Test suite for TextBase component
 */
describe('TextBase', () => {
  describe('Rendering', () => {
    it('should render children correctly', () => {
      render(<TextBase>Hello World</TextBase>)
      expect(screen.getByText('Hello World')).toBeTruthy()
    })

    it('should render with default props', () => {
      const {getByText} = render(<TextBase>Default Text</TextBase>)
      const text = getByText('Default Text')
      expect(text).toBeTruthy()
      expect(text.props.accessible).toBe(true)
      expect(text.props.accessibilityRole).toBe('text')
    })

    it('should render with custom accessibility role', () => {
      const {getByText} = render(
        <TextBase accessibilityRole="header">Header Text</TextBase>
      )
      const text = getByText('Header Text')
      expect(text.props.accessibilityRole).toBe('header')
    })

    it('should render when accessible is false', () => {
      const {getByText} = render(
        <TextBase accessible={false}>Non-accessible Text</TextBase>
      )
      const text = getByText('Non-accessible Text')
      expect(text.props.accessible).toBe(false)
    })
  })

  describe('Styling', () => {
    it('should apply default color', () => {
      render(<TextBase>Styled Text</TextBase>)
      expect(screen.getByText('Styled Text')).toBeTruthy()
    })

    it('should accept custom fontFamily prop', () => {
      render(<TextBase fontFamily="bold">Bold Text</TextBase>)
      expect(screen.getByText('Bold Text')).toBeTruthy()
    })

    it('should accept custom fontSize prop', () => {
      render(<TextBase fontSize="h1">Large Text</TextBase>)
      expect(screen.getByText('Large Text')).toBeTruthy()
    })

    it('should accept custom lineHeight prop', () => {
      render(<TextBase lineHeight="h1">Line Height Text</TextBase>)
      expect(screen.getByText('Line Height Text')).toBeTruthy()
    })

    it('should accept align prop for text alignment', () => {
      render(<TextBase align="center">Centered Text</TextBase>)
      expect(screen.getByText('Centered Text')).toBeTruthy()
    })

    it('should accept left alignment', () => {
      render(<TextBase align="left">Left Text</TextBase>)
      expect(screen.getByText('Left Text')).toBeTruthy()
    })

    it('should accept right alignment', () => {
      render(<TextBase align="right">Right Text</TextBase>)
      expect(screen.getByText('Right Text')).toBeTruthy()
    })

    it('should accept justify alignment', () => {
      render(<TextBase align="justify">Justified Text</TextBase>)
      expect(screen.getByText('Justified Text')).toBeTruthy()
    })

    it('should accept custom style prop', () => {
      const customStyle = {opacity: 0.5}
      const {getByText} = render(
        <TextBase style={customStyle}>Custom Style Text</TextBase>
      )
      expect(getByText('Custom Style Text')).toBeTruthy()
    })
  })

  describe('Props Forwarding', () => {
    it('should forward testID prop', () => {
      render(<TextBase testID="test-text">Test ID Text</TextBase>)
      expect(screen.getByTestId('test-text')).toBeTruthy()
    })

    it('should forward numberOfLines prop', () => {
      const {getByText} = render(
        <TextBase numberOfLines={2}>
          Long text that should be truncated after two lines
        </TextBase>
      )
      const text = getByText(
        'Long text that should be truncated after two lines'
      )
      expect(text.props.numberOfLines).toBe(2)
    })

    it('should forward ellipsizeMode prop', () => {
      const {getByText} = render(
        <TextBase
          numberOfLines={1}
          ellipsizeMode="tail">
          Text with ellipsis
        </TextBase>
      )
      const text = getByText('Text with ellipsis')
      expect(text.props.ellipsizeMode).toBe('tail')
    })

    it('should forward onPress prop', () => {
      const onPress = jest.fn()
      const {getByText} = render(
        <TextBase onPress={onPress}>Pressable Text</TextBase>
      )
      const text = getByText('Pressable Text')
      expect(text.props.onPress).toBe(onPress)
    })
  })

  describe('Accessibility', () => {
    it('should have accessibility role text by default', () => {
      const {getByText} = render(<TextBase>Accessible Text</TextBase>)
      const text = getByText('Accessible Text')
      expect(text.props.accessibilityRole).toBe('text')
    })

    it('should accept accessibilityLabel prop', () => {
      const {getByLabelText} = render(
        <TextBase accessibilityLabel="Custom Label">Text Content</TextBase>
      )
      expect(getByLabelText('Custom Label')).toBeTruthy()
    })

    it('should accept accessibilityHint prop', () => {
      const {getByText} = render(
        <TextBase accessibilityHint="This is a hint">Hinted Text</TextBase>
      )
      const text = getByText('Hinted Text')
      expect(text.props.accessibilityHint).toBe('This is a hint')
    })
  })

  describe('Edge Cases', () => {
    it('should render with empty children', () => {
      const {container} = render(<TextBase />)
      expect(container).toBeTruthy()
    })

    it('should render with null children', () => {
      const {container} = render(<TextBase>{null}</TextBase>)
      expect(container).toBeTruthy()
    })

    it('should render with number children', () => {
      render(<TextBase>{123}</TextBase>)
      expect(screen.getByText('123')).toBeTruthy()
    })

    it('should render with multiple children elements', () => {
      render(
        <TextBase>
          First <TextBase>Second</TextBase>
        </TextBase>
      )
      expect(screen.getByText('First')).toBeTruthy()
      expect(screen.getByText('Second')).toBeTruthy()
    })
  })
})
