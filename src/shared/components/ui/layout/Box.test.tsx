/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */
// eslint-disable-next-line no-restricted-imports
import {type StyleProp, Text, type ViewStyle} from 'react-native'

import {render, screen} from '@testing-library/react-native'

import {Box} from './Box'

/**
 * Test suite for Box component
 */
describe('Box', () => {
  describe('Rendering', () => {
    it('should render children correctly', () => {
      render(
        <Box testID="TestBox">
          <Text>Child content</Text>
        </Box>,
      )
      expect(screen.getByText('Child content')).toBeTruthy()
    })

    it('should render multiple children', () => {
      render(
        <Box testID="TestBox">
          <Text>First</Text>
          <Text>Second</Text>
          <Text>Third</Text>
        </Box>,
      )
      expect(screen.getByText('First')).toBeTruthy()
      expect(screen.getByText('Second')).toBeTruthy()
      expect(screen.getByText('Third')).toBeTruthy()
    })

    it('should render with testID', () => {
      render(<Box testID="TestBox" />)
      expect(screen.getByTestId('TestBox')).toBeTruthy()
    })
  })

  describe('Flexbox Direction', () => {
    it('should apply row direction when row prop is true', () => {
      render(
        <Box
          testID="TestBox"
          row
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({flexDirection: 'row'}),
        ]),
      )
    })

    it('should apply column direction when column prop is true', () => {
      render(
        <Box
          testID="TestBox"
          column
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({flexDirection: 'column'}),
        ]),
      )
    })

    it('should not apply flex direction by default', () => {
      render(<Box testID="TestBox" />)
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.not.objectContaining({flexDirection: expect.anything()}),
        ]),
      )
    })
  })

  describe('Flex', () => {
    it('should apply flex when flex prop is provided', () => {
      render(
        <Box
          testID="TestBox"
          flex={1}
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flex: 1})]),
      )
    })

    it('should apply different flex values', () => {
      const {rerender} = render(
        <Box
          testID="TestBox"
          flex={2}
        />,
      )
      let view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flex: 2})]),
      )

      rerender(
        <Box
          testID="TestBox"
          flex={0}
        />,
      )
      view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flex: 0})]),
      )
    })

    it('should apply flexShrink 0 when flex is undefined', () => {
      render(<Box testID="TestBox" />)
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flexShrink: 0})]),
      )
    })
  })

  describe('Alignment', () => {
    it('should center content when center prop is true', () => {
      render(
        <Box
          testID="TestBox"
          center
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            justifyContent: 'center',
            alignItems: 'center',
          }),
        ]),
      )
    })

    it('should center horizontally when centerX prop is true', () => {
      render(
        <Box
          testID="TestBox"
          centerX
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({alignItems: 'center'}),
        ]),
      )
    })

    it('should center vertically when centerY prop is true', () => {
      render(
        <Box
          testID="TestBox"
          centerY
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({justifyContent: 'center'}),
        ]),
      )
    })

    it('should apply custom justifyContent', () => {
      render(
        <Box
          testID="TestBox"
          justifyContent="space-between"
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({justifyContent: 'space-between'}),
        ]),
      )
    })

    it('should apply custom alignItems', () => {
      render(
        <Box
          testID="TestBox"
          alignItems="flex-end"
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({alignItems: 'flex-end'}),
        ]),
      )
    })

    it('should stretch when stretch prop is true', () => {
      render(
        <Box
          testID="TestBox"
          stretch
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({alignSelf: 'stretch'}),
        ]),
      )
    })
  })

  describe('Gap', () => {
    it('should apply gap from theme tokens', () => {
      render(
        <Box
          testID="TestBox"
          gap="md"
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({gap: expect.any(Number)}),
        ]),
      )
    })

    it('should render with different gap sizes from theme', () => {
      render(
        <Box
          testID="TestBox"
          gap="lg"
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({gap: expect.any(Number)}),
        ]),
      )
    })

    it('should not apply gap when gap prop is not provided', () => {
      render(<Box testID="TestBox" />)
      const view = screen.getByTestId('TestBox')
      const styles = Array.isArray(view.props.style)
        ? view.props.style
        : [view.props.style]
      const hasGap = styles.some(
        (style: StyleProp<ViewStyle>) =>
          Boolean(style) &&
          style !== null &&
          typeof style === 'object' &&
          'gap' in style &&
          typeof style.gap === 'number',
      )

      expect(hasGap).toBe(false)
    })
  })

  describe('Padding', () => {
    it('should apply uniform padding from theme tokens', () => {
      render(
        <Box
          testID="TestBox"
          padding="md"
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({padding: expect.any(Number)}),
        ]),
      )
    })

    it('should apply horizontal padding from theme tokens', () => {
      render(
        <Box
          testID="TestBox"
          paddingH="lg"
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({paddingHorizontal: expect.any(Number)}),
        ]),
      )
    })

    it('should apply vertical padding from theme tokens', () => {
      render(
        <Box
          testID="TestBox"
          paddingV="sm"
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({paddingVertical: expect.any(Number)}),
        ]),
      )
    })

    it('should apply top padding from theme tokens', () => {
      render(
        <Box
          testID="TestBox"
          paddingTop="xl"
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({paddingTop: expect.any(Number)}),
        ]),
      )
    })

    it('should apply right padding from theme tokens', () => {
      render(
        <Box
          testID="TestBox"
          paddingRight="md"
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({paddingRight: expect.any(Number)}),
        ]),
      )
    })

    it('should apply bottom padding from theme tokens', () => {
      render(
        <Box
          testID="TestBox"
          paddingBottom="sm"
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({paddingBottom: expect.any(Number)}),
        ]),
      )
    })

    it('should apply left padding from theme tokens', () => {
      render(
        <Box
          testID="TestBox"
          paddingLeft="lg"
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({paddingLeft: expect.any(Number)}),
        ]),
      )
    })
  })

  describe('Wrap', () => {
    it('should apply flexWrap when wrap prop is provided', () => {
      render(
        <Box
          testID="TestBox"
          wrap="wrap"
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flexWrap: 'wrap'})]),
      )
    })

    it('should apply nowrap', () => {
      render(
        <Box
          testID="TestBox"
          wrap="nowrap"
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flexWrap: 'nowrap'})]),
      )
    })
  })

  describe('Custom Styles', () => {
    it('should accept custom style prop', () => {
      const customStyle = {backgroundColor: 'red'}
      render(
        <Box
          testID="TestBox"
          style={customStyle}
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining(customStyle)]),
      )
    })

    it('should merge custom styles with Box styles', () => {
      const customStyle = {opacity: 0.5}
      render(
        <Box
          testID="TestBox"
          flex={1}
          style={customStyle}
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(expect.arrayContaining([customStyle]))
    })
  })

  describe('Complex Layouts', () => {
    it('should create a centered flex container', () => {
      render(
        <Box
          testID="TestBox"
          flex={1}
          center>
          <Text>Centered</Text>
        </Box>,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }),
        ]),
      )
    })

    it('should create a row with gap and padding', () => {
      render(
        <Box
          testID="TestBox"
          row
          gap="md"
          padding="lg">
          <Text>Item 1</Text>
          <Text>Item 2</Text>
        </Box>,
      )
      expect(screen.getByText('Item 1')).toBeTruthy()
      expect(screen.getByText('Item 2')).toBeTruthy()
    })

    it('should create a column with justified content', () => {
      render(
        <Box
          testID="TestBox"
          column
          justifyContent="space-between"
          paddingV="md">
          <Text>Top</Text>
          <Text>Bottom</Text>
        </Box>,
      )
      expect(screen.getByText('Top')).toBeTruthy()
      expect(screen.getByText('Bottom')).toBeTruthy()
    })
  })

  describe('Style Prop Combinations', () => {
    it('should combine gap and padding correctly', () => {
      render(
        <Box
          testID="TestBox"
          gap="md"
          padding="lg"
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            gap: expect.any(Number),
            padding: expect.any(Number),
          }),
        ]),
      )
    })

    it('should combine paddingH and paddingV correctly', () => {
      render(
        <Box
          testID="TestBox"
          paddingH="md"
          paddingV="lg"
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            paddingHorizontal: expect.any(Number),
            paddingVertical: expect.any(Number),
          }),
        ]),
      )
    })

    it('should combine individual padding props correctly', () => {
      render(
        <Box
          testID="TestBox"
          paddingTop="sm"
          paddingRight="md"
          paddingBottom="lg"
          paddingLeft="xl"
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            paddingTop: expect.any(Number),
            paddingRight: expect.any(Number),
            paddingBottom: expect.any(Number),
            paddingLeft: expect.any(Number),
          }),
        ]),
      )
    })

    it('should combine flex direction with gap and padding', () => {
      render(
        <Box
          testID="TestBox"
          row
          gap="md"
          paddingH="lg"
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            flexDirection: 'row',
            gap: expect.any(Number),
            paddingHorizontal: expect.any(Number),
          }),
        ]),
      )
    })

    it('should combine alignment with padding', () => {
      render(
        <Box
          testID="TestBox"
          center
          padding="md"
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            justifyContent: 'center',
            alignItems: 'center',
            padding: expect.any(Number),
          }),
        ]),
      )
    })

    it('should combine flex with wrap and gap', () => {
      render(
        <Box
          testID="TestBox"
          flex={1}
          wrap="wrap"
          gap="sm"
        />,
      )
      const view = screen.getByTestId('TestBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            flex: 1,
            flexWrap: 'wrap',
            gap: expect.any(Number),
          }),
        ]),
      )
    })
  })

  describe('Edge Cases', () => {
    it('should render with no props', () => {
      const {root} = render(<Box testID="TestBox" />)
      expect(root).toBeTruthy()
    })

    it('should render with empty children', () => {
      render(<Box testID="TestBox">{null}</Box>)
      expect(screen.getByTestId('TestBox')).toBeTruthy()
    })

    it('should render with conditional children', () => {
      const showContent = true
      render(
        <Box testID="TestBox">{showContent && <Text>Conditional</Text>}</Box>,
      )
      expect(screen.getByText('Conditional')).toBeTruthy()
    })
  })
})
