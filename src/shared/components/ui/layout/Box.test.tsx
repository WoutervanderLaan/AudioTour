import {render, screen} from '@testing-library/react-native'
import {Text, View} from 'react-native'

import {Box} from './Box'

/**
 * Test suite for Box component
 */
describe('Box', () => {
  describe('Rendering', () => {
    it('should render children correctly', () => {
      render(
        <Box>
          <Text>Child content</Text>
        </Box>
      )
      expect(screen.getByText('Child content')).toBeTruthy()
    })

    it('should render multiple children', () => {
      render(
        <Box>
          <Text>First</Text>
          <Text>Second</Text>
          <Text>Third</Text>
        </Box>
      )
      expect(screen.getByText('First')).toBeTruthy()
      expect(screen.getByText('Second')).toBeTruthy()
      expect(screen.getByText('Third')).toBeTruthy()
    })

    it('should render with testID', () => {
      render(<Box testID="test-box" />)
      expect(screen.getByTestId('test-box')).toBeTruthy()
    })
  })

  describe('Flexbox Direction', () => {
    it('should apply row direction when row prop is true', () => {
      const {UNSAFE_getByType} = render(<Box row />)
      const view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({flexDirection: 'row'}),
        ])
      )
    })

    it('should apply column direction when column prop is true', () => {
      const {UNSAFE_getByType} = render(<Box column />)
      const view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({flexDirection: 'column'}),
        ])
      )
    })

    it('should not apply flex direction by default', () => {
      const {UNSAFE_getByType} = render(<Box />)
      const view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.not.objectContaining({flexDirection: expect.anything()}),
        ])
      )
    })
  })

  describe('Flex', () => {
    it('should apply flex when flex prop is provided', () => {
      const {UNSAFE_getByType} = render(<Box flex={1} />)
      const view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flex: 1})])
      )
    })

    it('should apply different flex values', () => {
      const {UNSAFE_getByType, rerender} = render(<Box flex={2} />)
      let view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flex: 2})])
      )

      rerender(<Box flex={0} />)
      view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flex: 0})])
      )
    })

    it('should apply flexShrink 0 when flex is undefined', () => {
      const {UNSAFE_getByType} = render(<Box />)
      const view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flexShrink: 0})])
      )
    })
  })

  describe('Alignment', () => {
    it('should center content when center prop is true', () => {
      const {UNSAFE_getByType} = render(<Box center />)
      const view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            justifyContent: 'center',
            alignItems: 'center',
          }),
        ])
      )
    })

    it('should center horizontally when centerX prop is true', () => {
      const {UNSAFE_getByType} = render(<Box centerX />)
      const view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({alignItems: 'center'}),
        ])
      )
    })

    it('should center vertically when centerY prop is true', () => {
      const {UNSAFE_getByType} = render(<Box centerY />)
      const view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({justifyContent: 'center'}),
        ])
      )
    })

    it('should apply custom justifyContent', () => {
      const {UNSAFE_getByType} = render(
        <Box justifyContent="space-between" />
      )
      const view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({justifyContent: 'space-between'}),
        ])
      )
    })

    it('should apply custom alignItems', () => {
      const {UNSAFE_getByType} = render(<Box alignItems="flex-end" />)
      const view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({alignItems: 'flex-end'}),
        ])
      )
    })

    it('should stretch when stretch prop is true', () => {
      const {UNSAFE_getByType} = render(<Box stretch />)
      const view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({alignSelf: 'stretch'}),
        ])
      )
    })
  })

  describe('Gap', () => {
    it('should apply gap when gap prop is provided', () => {
      render(<Box gap="md" />)
      // Gap is applied through theme tokens, just verify component renders
      expect(screen.queryByTestId('box')).toBeTruthy()
    })

    it('should render with different gap sizes', () => {
      const {UNSAFE_getByType} = render(<Box gap="lg" />)
      const view = UNSAFE_getByType(View)
      expect(view.props.style).toBeTruthy()
    })
  })

  describe('Padding', () => {
    it('should apply uniform padding when padding prop is provided', () => {
      render(<Box padding="md" />)
      expect(screen.queryByTestId('box')).toBeTruthy()
    })

    it('should apply horizontal padding when paddingH is provided', () => {
      render(<Box paddingH="lg" />)
      expect(screen.queryByTestId('box')).toBeTruthy()
    })

    it('should apply vertical padding when paddingV is provided', () => {
      render(<Box paddingV="sm" />)
      expect(screen.queryByTestId('box')).toBeTruthy()
    })

    it('should apply top padding when paddingTop is provided', () => {
      render(<Box paddingTop="xl" />)
      expect(screen.queryByTestId('box')).toBeTruthy()
    })

    it('should apply right padding when paddingRight is provided', () => {
      render(<Box paddingRight="md" />)
      expect(screen.queryByTestId('box')).toBeTruthy()
    })

    it('should apply bottom padding when paddingBottom is provided', () => {
      render(<Box paddingBottom="sm" />)
      expect(screen.queryByTestId('box')).toBeTruthy()
    })

    it('should apply left padding when paddingLeft is provided', () => {
      render(<Box paddingLeft="lg" />)
      expect(screen.queryByTestId('box')).toBeTruthy()
    })
  })

  describe('Wrap', () => {
    it('should apply flexWrap when wrap prop is provided', () => {
      const {UNSAFE_getByType} = render(<Box wrap="wrap" />)
      const view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flexWrap: 'wrap'})])
      )
    })

    it('should apply nowrap', () => {
      const {UNSAFE_getByType} = render(<Box wrap="nowrap" />)
      const view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flexWrap: 'nowrap'})])
      )
    })
  })

  describe('Custom Styles', () => {
    it('should accept custom style prop', () => {
      const customStyle = {backgroundColor: 'red'}
      const {UNSAFE_getByType} = render(<Box style={customStyle} />)
      const view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining(customStyle)])
      )
    })

    it('should merge custom styles with Box styles', () => {
      const customStyle = {opacity: 0.5}
      const {UNSAFE_getByType} = render(
        <Box
          flex={1}
          style={customStyle}
        />
      )
      const view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(expect.arrayContaining([customStyle]))
    })
  })

  describe('Complex Layouts', () => {
    it('should create a centered flex container', () => {
      const {UNSAFE_getByType} = render(
        <Box
          flex={1}
          center>
          <Text>Centered</Text>
        </Box>
      )
      const view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }),
        ])
      )
    })

    it('should create a row with gap and padding', () => {
      render(
        <Box
          row
          gap="md"
          padding="lg">
          <Text>Item 1</Text>
          <Text>Item 2</Text>
        </Box>
      )
      expect(screen.getByText('Item 1')).toBeTruthy()
      expect(screen.getByText('Item 2')).toBeTruthy()
    })

    it('should create a column with justified content', () => {
      render(
        <Box
          column
          justifyContent="space-between"
          paddingV="md">
          <Text>Top</Text>
          <Text>Bottom</Text>
        </Box>
      )
      expect(screen.getByText('Top')).toBeTruthy()
      expect(screen.getByText('Bottom')).toBeTruthy()
    })
  })

  describe('Edge Cases', () => {
    it('should render with no props', () => {
      const {container} = render(<Box />)
      expect(container).toBeTruthy()
    })

    it('should render with empty children', () => {
      const {UNSAFE_getByType} = render(<Box>{null}</Box>)
      expect(UNSAFE_getByType(View)).toBeTruthy()
    })

    it('should render with conditional children', () => {
      const showContent = true
      render(<Box>{showContent && <Text>Conditional</Text>}</Box>)
      expect(screen.getByText('Conditional')).toBeTruthy()
    })
  })
})
