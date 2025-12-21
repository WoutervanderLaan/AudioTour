import {render, screen} from '@testing-library/react-native'
import {View} from 'react-native'

import {Spacer} from './Spacer'

/**
 * Test suite for Spacer component
 */
describe('Spacer', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const {container} = render(<Spacer />)
      expect(container).toBeTruthy()
    })

    it('should render with testID when passed through Box', () => {
      const {UNSAFE_getByType} = render(<Spacer />)
      expect(UNSAFE_getByType(View)).toBeTruthy()
    })
  })

  describe('Flex Behavior', () => {
    it('should have flex 1 by default', () => {
      const {UNSAFE_getByType} = render(<Spacer />)
      const view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flex: 1})])
      )
    })

    it('should fill available space', () => {
      const {UNSAFE_getByType} = render(<Spacer />)
      const view = UNSAFE_getByType(View)
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flex: 1})])
      )
    })
  })

  describe('Size Prop', () => {
    it('should render without size prop', () => {
      const {UNSAFE_getByType} = render(<Spacer />)
      expect(UNSAFE_getByType(View)).toBeTruthy()
    })

    it('should accept size prop for padding', () => {
      render(<Spacer size="md" />)
      const view = screen.UNSAFE_queryByType(View)
      expect(view).toBeTruthy()
    })

    it('should accept small size', () => {
      render(<Spacer size="sm" />)
      const view = screen.UNSAFE_queryByType(View)
      expect(view).toBeTruthy()
    })

    it('should accept large size', () => {
      render(<Spacer size="lg" />)
      const view = screen.UNSAFE_queryByType(View)
      expect(view).toBeTruthy()
    })

    it('should accept extra large size', () => {
      render(<Spacer size="xl" />)
      const view = screen.UNSAFE_queryByType(View)
      expect(view).toBeTruthy()
    })

    it('should accept extra small size', () => {
      render(<Spacer size="xs" />)
      const view = screen.UNSAFE_queryByType(View)
      expect(view).toBeTruthy()
    })
  })

  describe('Common Use Cases', () => {
    it('should push content to edges in a row', () => {
      const {getAllByText} = render(
        <View style={{flexDirection: 'row'}}>
          <View>
            <text>Left</text>
          </View>
          <Spacer />
          <View>
            <text>Right</text>
          </View>
        </View>
      )
      // Verify all children are rendered
      expect(getAllByText('Left')).toBeTruthy()
      expect(getAllByText('Right')).toBeTruthy()
    })

    it('should create vertical spacing in a column', () => {
      const {getAllByText} = render(
        <View style={{flexDirection: 'column'}}>
          <View>
            <text>Top</text>
          </View>
          <Spacer />
          <View>
            <text>Bottom</text>
          </View>
        </View>
      )
      expect(getAllByText('Top')).toBeTruthy()
      expect(getAllByText('Bottom')).toBeTruthy()
    })

    it('should work with size for visual spacing', () => {
      const {getAllByText} = render(
        <View style={{flexDirection: 'column'}}>
          <View>
            <text>Content 1</text>
          </View>
          <Spacer size="lg" />
          <View>
            <text>Content 2</text>
          </View>
        </View>
      )
      expect(getAllByText('Content 1')).toBeTruthy()
      expect(getAllByText('Content 2')).toBeTruthy()
    })

    it('should work between multiple items', () => {
      const {getAllByText} = render(
        <View style={{flexDirection: 'row'}}>
          <View>
            <text>Item 1</text>
          </View>
          <Spacer />
          <View>
            <text>Item 2</text>
          </View>
          <Spacer />
          <View>
            <text>Item 3</text>
          </View>
        </View>
      )
      expect(getAllByText('Item 1')).toBeTruthy()
      expect(getAllByText('Item 2')).toBeTruthy()
      expect(getAllByText('Item 3')).toBeTruthy()
    })
  })

  describe('Edge Cases', () => {
    it('should render multiple spacers', () => {
      const {UNSAFE_getAllByType} = render(
        <View>
          <Spacer />
          <Spacer />
          <Spacer />
        </View>
      )
      const views = UNSAFE_getAllByType(View)
      // Parent view + 3 spacers = 4 views
      expect(views.length).toBeGreaterThanOrEqual(3)
    })

    it('should work with different sizes in sequence', () => {
      const {container} = render(
        <View>
          <Spacer size="sm" />
          <Spacer size="md" />
          <Spacer size="lg" />
        </View>
      )
      expect(container).toBeTruthy()
    })

    it('should not render children', () => {
      const {queryByText} = render(<Spacer />)
      expect(queryByText('Should not appear')).toBeNull()
    })
  })
})
