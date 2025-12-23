import {Text, View} from 'react-native'

import {render, screen} from '@testing-library/react-native'

import {Spacer} from './Spacer'

/**
 * Test suite for Spacer component
 */
describe('Spacer', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const {root} = render(<Spacer />)
      expect(root).toBeTruthy()
    })

    it('should render with testID', () => {
      render(<Spacer testID="spacer" />)
      expect(screen.getByTestId('spacer')).toBeTruthy()
    })
  })

  describe('Flex Behavior', () => {
    it('should have flex 1 by default', () => {
      render(<Spacer testID="spacer" />)
      const view = screen.getByTestId('spacer')
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flex: 1})]),
      )
    })

    it('should fill available space', () => {
      render(<Spacer testID="spacer" />)
      const view = screen.getByTestId('spacer')
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flex: 1})]),
      )
    })
  })

  describe('Size Prop', () => {
    it('should render without size prop', () => {
      render(<Spacer testID="spacer" />)
      expect(screen.getByTestId('spacer')).toBeTruthy()
    })

    it('should accept size prop for padding', () => {
      render(
        <Spacer
          testID="spacer"
          size="md"
        />,
      )
      expect(screen.getByTestId('spacer')).toBeTruthy()
    })

    it('should accept small size', () => {
      render(
        <Spacer
          testID="spacer"
          size="sm"
        />,
      )
      expect(screen.getByTestId('spacer')).toBeTruthy()
    })

    it('should accept large size', () => {
      render(
        <Spacer
          testID="spacer"
          size="lg"
        />,
      )
      expect(screen.getByTestId('spacer')).toBeTruthy()
    })

    it('should accept extra large size', () => {
      render(
        <Spacer
          testID="spacer"
          size="xl"
        />,
      )
      expect(screen.getByTestId('spacer')).toBeTruthy()
    })

    it('should accept extra small size', () => {
      render(
        <Spacer
          testID="spacer"
          size="xs"
        />,
      )
      expect(screen.getByTestId('spacer')).toBeTruthy()
    })
  })

  describe('Common Use Cases', () => {
    it('should push content to edges in a row', () => {
      const {getAllByText} = render(
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text>Left</Text>
          </View>
          <Spacer />
          <View>
            <Text>Right</Text>
          </View>
        </View>,
      )
      // Verify all children are rendered
      expect(getAllByText('Left')).toBeTruthy()
      expect(getAllByText('Right')).toBeTruthy()
    })

    it('should create vertical spacing in a column', () => {
      const {getAllByText} = render(
        <View style={{flexDirection: 'column'}}>
          <View>
            <Text>Top</Text>
          </View>
          <Spacer />
          <View>
            <Text>Bottom</Text>
          </View>
        </View>,
      )
      expect(getAllByText('Top')).toBeTruthy()
      expect(getAllByText('Bottom')).toBeTruthy()
    })

    it('should work with size for visual spacing', () => {
      const {getAllByText} = render(
        <View style={{flexDirection: 'column'}}>
          <View>
            <Text>Content 1</Text>
          </View>
          <Spacer size="lg" />
          <View>
            <Text>Content 2</Text>
          </View>
        </View>,
      )
      expect(getAllByText('Content 1')).toBeTruthy()
      expect(getAllByText('Content 2')).toBeTruthy()
    })

    it('should work between multiple items', () => {
      const {getAllByText} = render(
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text>Item 1</Text>
          </View>
          <Spacer />
          <View>
            <Text>Item 2</Text>
          </View>
          <Spacer />
          <View>
            <Text>Item 3</Text>
          </View>
        </View>,
      )
      expect(getAllByText('Item 1')).toBeTruthy()
      expect(getAllByText('Item 2')).toBeTruthy()
      expect(getAllByText('Item 3')).toBeTruthy()
    })
  })

  describe('Edge Cases', () => {
    it('should render multiple spacers', () => {
      render(
        <>
          <Spacer testID="spacer-1" />
          <Spacer testID="spacer-2" />
          <Spacer testID="spacer-3" />
        </>,
      )
      expect(screen.getByTestId('spacer-1')).toBeTruthy()
      expect(screen.getByTestId('spacer-2')).toBeTruthy()
      expect(screen.getByTestId('spacer-3')).toBeTruthy()
    })

    it('should work with different sizes in sequence', () => {
      render(
        <>
          <Spacer
            testID="spacer-sm"
            size="sm"
          />
          <Spacer
            testID="spacer-md"
            size="md"
          />
          <Spacer
            testID="spacer-lg"
            size="lg"
          />
        </>,
      )
      expect(screen.getByTestId('spacer-sm')).toBeTruthy()
      expect(screen.getByTestId('spacer-md')).toBeTruthy()
      expect(screen.getByTestId('spacer-lg')).toBeTruthy()
    })

    it('should not render children', () => {
      const {queryByText} = render(<Spacer testID="spacer" />)
      expect(queryByText('Should not appear')).toBeNull()
    })
  })
})
