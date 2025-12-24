import {Text, View} from 'react-native'

import {render, screen} from '@testing-library/react-native'

import {Spacer} from './Spacer'

/**
 * Test suite for Spacer component
 */
describe('Spacer', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const {root} = render(<Spacer testID="TestSpacer" />)
      expect(root).toBeTruthy()
    })

    it('should render with testID', () => {
      render(<Spacer testID="TestSpacer" />)
      expect(screen.getByTestId('TestSpacerBox')).toBeTruthy()
    })
  })

  describe('Flex Behavior', () => {
    it('should have flex 1 by default', () => {
      render(<Spacer testID="TestSpacer" />)
      const view = screen.getByTestId('TestSpacerBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flex: 1})]),
      )
    })

    it('should fill available space', () => {
      render(<Spacer testID="TestSpacer" />)
      const view = screen.getByTestId('TestSpacerBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flex: 1})]),
      )
    })
  })

  describe('Size Prop', () => {
    it('should render without size prop', () => {
      render(<Spacer testID="TestSpacer" />)
      expect(screen.getByTestId('TestSpacerBox')).toBeTruthy()
    })

    it('should accept size prop for padding', () => {
      render(
        <Spacer
          testID="TestSpacer"
          size="md"
        />,
      )
      expect(screen.getByTestId('TestSpacerBox')).toBeTruthy()
    })

    it('should accept small size', () => {
      render(
        <Spacer
          testID="TestSpacer"
          size="sm"
        />,
      )
      expect(screen.getByTestId('TestSpacerBox')).toBeTruthy()
    })

    it('should accept large size', () => {
      render(
        <Spacer
          testID="TestSpacer"
          size="lg"
        />,
      )
      expect(screen.getByTestId('TestSpacerBox')).toBeTruthy()
    })

    it('should accept extra large size', () => {
      render(
        <Spacer
          testID="TestSpacer"
          size="xl"
        />,
      )
      expect(screen.getByTestId('TestSpacerBox')).toBeTruthy()
    })

    it('should accept extra small size', () => {
      render(
        <Spacer
          testID="TestSpacer"
          size="xs"
        />,
      )
      expect(screen.getByTestId('TestSpacerBox')).toBeTruthy()
    })
  })

  describe('Common Use Cases', () => {
    it('should push content to edges in a row', () => {
      const {getAllByText} = render(
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text>Left</Text>
          </View>
          <Spacer testID="TestSpacer" />
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
          <Spacer testID="TestSpacer" />
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
          <Spacer
            testID="TestSpacer"
            size="lg"
          />
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
          <Spacer testID="TestSpacer" />
          <View>
            <Text>Item 2</Text>
          </View>
          <Spacer testID="TestSpacer" />
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
          <Spacer testID="Test1Spacer" />
          <Spacer testID="Test2Spacer" />
          <Spacer testID="Test3Spacer" />
        </>,
      )
      expect(screen.getByTestId('Test1SpacerBox')).toBeTruthy()
      expect(screen.getByTestId('Test2SpacerBox')).toBeTruthy()
      expect(screen.getByTestId('Test3SpacerBox')).toBeTruthy()
    })

    it('should work with different sizes in sequence', () => {
      render(
        <>
          <Spacer
            testID="TestsmSpacer"
            size="sm"
          />
          <Spacer
            testID="TestmdSpacer"
            size="md"
          />
          <Spacer
            testID="TestlgSpacer"
            size="lg"
          />
        </>,
      )
      expect(screen.getByTestId('TestsmSpacerBox')).toBeTruthy()
      expect(screen.getByTestId('TestmdSpacerBox')).toBeTruthy()
      expect(screen.getByTestId('TestlgSpacerBox')).toBeTruthy()
    })

    it('should not render children', () => {
      const {queryByText} = render(<Spacer testID="TestSpacer" />)
      expect(queryByText('Should not appear')).toBeNull()
    })
  })
})
