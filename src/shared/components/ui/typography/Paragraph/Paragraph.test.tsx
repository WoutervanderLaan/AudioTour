import {render, screen} from '@testing-library/react-native'

import {Paragraph} from './Paragraph'

/**
 * Test suite for Paragraph component
 */
describe('Paragraph', () => {
  describe('Rendering', () => {
    it('should render children correctly', () => {
      render(<Paragraph testID="ParagraphText">Paragraph text</Paragraph>)
      expect(screen.getByText('Paragraph text')).toBeTruthy()
    })

    it('should render with default body variant', () => {
      render(<Paragraph testID="ParagraphText">Default body text</Paragraph>)
      expect(screen.getByText('Default body text')).toBeTruthy()
    })

    it('should render with default regular font family', () => {
      render(<Paragraph testID="ParagraphText">Regular text</Paragraph>)
      expect(screen.getByText('Regular text')).toBeTruthy()
    })
  })

  describe('Variants', () => {
    it('should render body variant', () => {
      render(
        <Paragraph
          testID="ParagraphText"
          variant="body">
          Body text
        </Paragraph>,
      )
      expect(screen.getByText('Body text')).toBeTruthy()
    })

    it('should render intro variant', () => {
      render(
        <Paragraph
          testID="ParagraphText"
          variant="intro">
          Intro text
        </Paragraph>,
      )
      expect(screen.getByText('Intro text')).toBeTruthy()
    })

    it('should render quote variant', () => {
      render(
        <Paragraph
          testID="ParagraphText"
          variant="quote">
          Quote text
        </Paragraph>,
      )
      expect(screen.getByText('Quote text')).toBeTruthy()
    })

    it('should render small variant', () => {
      render(
        <Paragraph
          testID="ParagraphText"
          variant="small">
          Small text
        </Paragraph>,
      )
      expect(screen.getByText('Small text')).toBeTruthy()
    })

    it('should render extraSmall variant', () => {
      render(
        <Paragraph
          testID="ParagraphText"
          variant="extraSmall">
          Extra small text
        </Paragraph>,
      )
      expect(screen.getByText('Extra small text')).toBeTruthy()
    })
  })

  describe('Font Family', () => {
    it('should accept custom fontFamily prop', () => {
      render(
        <Paragraph
          testID="ParagraphText"
          fontFamily="bold">
          Bold paragraph
        </Paragraph>,
      )
      expect(screen.getByText('Bold paragraph')).toBeTruthy()
    })

    it('should accept semiBold font family', () => {
      render(
        <Paragraph
          testID="ParagraphText"
          fontFamily="semiBold">
          SemiBold paragraph
        </Paragraph>,
      )
      expect(screen.getByText('SemiBold paragraph')).toBeTruthy()
    })

    it('should accept italic font family', () => {
      render(
        <Paragraph
          testID="ParagraphText"
          fontFamily="bold">
          Italic paragraph
        </Paragraph>,
      )
      expect(screen.getByText('Italic paragraph')).toBeTruthy()
    })
  })

  describe('Styling', () => {
    it('should accept custom color prop', () => {
      render(
        <Paragraph
          testID="ParagraphText"
          color="link">
          Colored text
        </Paragraph>,
      )
      expect(screen.getByText('Colored text')).toBeTruthy()
    })

    it('should accept align prop for center alignment', () => {
      render(
        <Paragraph
          testID="ParagraphText"
          align="center">
          Centered paragraph
        </Paragraph>,
      )
      expect(screen.getByText('Centered paragraph')).toBeTruthy()
    })

    it('should accept align prop for right alignment', () => {
      render(
        <Paragraph
          testID="ParagraphText"
          align="right">
          Right aligned paragraph
        </Paragraph>,
      )
      expect(screen.getByText('Right aligned paragraph')).toBeTruthy()
    })

    it('should accept custom style prop', () => {
      const customStyle = {marginTop: 10}
      const {getByText} = render(
        <Paragraph
          testID="ParagraphText"
          style={customStyle}>
          Styled paragraph
        </Paragraph>,
      )
      expect(getByText('Styled paragraph')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should be accessible by default', () => {
      const {getByText} = render(
        <Paragraph testID="ParagraphText">Accessible text</Paragraph>,
      )
      const paragraph = getByText('Accessible text')
      expect(paragraph.props.accessible).toBe(true)
    })

    it('should have text accessibility role', () => {
      const {getByText} = render(
        <Paragraph testID="ParagraphText">Text with role</Paragraph>,
      )
      const paragraph = getByText('Text with role')
      expect(paragraph.props.accessibilityRole).toBe('text')
    })

    it('should accept accessibilityLabel prop', () => {
      const {getByLabelText} = render(
        <Paragraph
          testID="ParagraphText"
          accessibilityLabel="Custom Paragraph Label">
          Content
        </Paragraph>,
      )
      expect(getByLabelText('Custom Paragraph Label')).toBeTruthy()
    })

    it('should accept accessibilityHint prop', () => {
      const {getByText} = render(
        <Paragraph
          testID="ParagraphText"
          accessibilityHint="Additional info">
          Text
        </Paragraph>,
      )
      const paragraph = getByText('Text')
      expect(paragraph.props.accessibilityHint).toBe('Additional info')
    })
  })

  describe('Props Forwarding', () => {
    it('should forward testID prop', () => {
      render(<Paragraph testID="ParagraphText">Test paragraph</Paragraph>)
      expect(screen.getByTestId('ParagraphText')).toBeTruthy()
    })

    it('should forward numberOfLines prop', () => {
      const {getByText} = render(
        <Paragraph
          testID="ParagraphText"
          numberOfLines={3}>
          Long paragraph text that should be truncated after three lines
        </Paragraph>,
      )
      const paragraph = getByText(
        'Long paragraph text that should be truncated after three lines',
      )
      expect(paragraph.props.numberOfLines).toBe(3)
    })

    it('should forward ellipsizeMode prop', () => {
      const {getByText} = render(
        <Paragraph
          testID="ParagraphText"
          numberOfLines={2}
          ellipsizeMode="tail">
          Paragraph with ellipsis at the end
        </Paragraph>,
      )
      const paragraph = getByText('Paragraph with ellipsis at the end')
      expect(paragraph.props.ellipsizeMode).toBe('tail')
    })

    it('should forward onPress prop', () => {
      const onPress = jest.fn()
      const {getByText} = render(
        <Paragraph
          testID="ParagraphText"
          onPress={onPress}>
          Pressable paragraph
        </Paragraph>,
      )
      const paragraph = getByText('Pressable paragraph')
      expect(paragraph.props.onPress).toBe(onPress)
    })
  })

  describe('Edge Cases', () => {
    it('should render with empty children', () => {
      const {root} = render(<Paragraph testID="ParagraphText" />)
      expect(root).toBeTruthy()
    })

    it('should render with null children', () => {
      const {root} = render(
        <Paragraph testID="ParagraphText">{null}</Paragraph>,
      )
      expect(root).toBeTruthy()
    })

    it('should render with number children', () => {
      render(<Paragraph testID="ParagraphText">{999}</Paragraph>)
      expect(screen.getByText('999')).toBeTruthy()
    })

    it('should render with boolean converted to string', () => {
      render(
        <Paragraph testID="ParagraphText">Status: {String(true)}</Paragraph>,
      )
      expect(screen.getByText('Status: true')).toBeTruthy()
    })
  })
})
