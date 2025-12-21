import {render, screen} from '@testing-library/react-native'
import {Text} from 'react-native'

import {Row} from './Row'

/**
 * Test suite for Row component
 */
describe('Row', () => {
  describe('Rendering', () => {
    it('should render children correctly', () => {
      render(
        <Row>
          <Text>Row content</Text>
        </Row>
      )
      expect(screen.getByText('Row content')).toBeTruthy()
    })

    it('should render multiple children horizontally', () => {
      render(
        <Row>
          <Text>First</Text>
          <Text>Second</Text>
          <Text>Third</Text>
        </Row>
      )
      expect(screen.getByText('First')).toBeTruthy()
      expect(screen.getByText('Second')).toBeTruthy()
      expect(screen.getByText('Third')).toBeTruthy()
    })

    it('should render with testID', () => {
      render(<Row testID="test-row" />)
      expect(screen.getByTestId('test-row')).toBeTruthy()
    })
  })

  describe('Layout Direction', () => {
    it('should apply row flex direction', () => {
      render(<Row testID="row" />)
      const view = screen.getByTestId('row')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({flexDirection: 'row'}),
        ])
      )
    })

    it('should always use row direction even without explicit row prop', () => {
      render(
        <Row testID="row">
          <Text>Content</Text>
        </Row>
      )
      const view = screen.getByTestId('row')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({flexDirection: 'row'}),
        ])
      )
    })
  })

  describe('Box Props', () => {
    it('should accept flex prop', () => {
      render(<Row testID="row" flex={1} />)
      const view = screen.getByTestId('row')
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flex: 1})])
      )
    })

    it('should accept center prop', () => {
      render(<Row testID="row" center />)
      const view = screen.getByTestId('row')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            justifyContent: 'center',
            alignItems: 'center',
          }),
        ])
      )
    })

    it('should accept gap prop', () => {
      render(<Row testID="row" gap="md" />)
      expect(screen.getByTestId('row')).toBeTruthy()
    })

    it('should accept padding prop', () => {
      render(<Row testID="row" padding="lg" />)
      expect(screen.getByTestId('row')).toBeTruthy()
    })

    it('should accept justifyContent prop', () => {
      render(
        <Row testID="row" justifyContent="space-between" />
      )
      const view = screen.getByTestId('row')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({justifyContent: 'space-between'}),
        ])
      )
    })

    it('should accept alignItems prop', () => {
      render(<Row testID="row" alignItems="flex-start" />)
      const view = screen.getByTestId('row')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({alignItems: 'flex-start'}),
        ])
      )
    })

    it('should accept wrap prop', () => {
      render(<Row testID="row" wrap="wrap" />)
      const view = screen.getByTestId('row')
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flexWrap: 'wrap'})])
      )
    })
  })

  describe('Custom Styles', () => {
    it('should accept custom style prop', () => {
      const customStyle = {backgroundColor: 'blue'}
      render(<Row testID="row" style={customStyle} />)
      const view = screen.getByTestId('row')
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining(customStyle)])
      )
    })

    it('should merge custom styles with Row styles', () => {
      const customStyle = {borderWidth: 1}
      render(
        <Row
          testID="row"
          gap="sm"
          style={customStyle}
        />
      )
      const view = screen.getByTestId('row')
      expect(view.props.style).toEqual(expect.arrayContaining([customStyle]))
    })
  })

  describe('Common Use Cases', () => {
    it('should create a horizontal navigation row', () => {
      render(
        <Row
          gap="md"
          justifyContent="space-around">
          <Text>Home</Text>
          <Text>Profile</Text>
          <Text>Settings</Text>
        </Row>
      )
      expect(screen.getByText('Home')).toBeTruthy()
      expect(screen.getByText('Profile')).toBeTruthy()
      expect(screen.getByText('Settings')).toBeTruthy()
    })

    it('should create a form row with label and input', () => {
      render(
        <Row
          gap="sm"
          alignItems="center">
          <Text>Label:</Text>
          <Text>Input</Text>
        </Row>
      )
      expect(screen.getByText('Label:')).toBeTruthy()
      expect(screen.getByText('Input')).toBeTruthy()
    })

    it('should create a card row with icon and text', () => {
      render(
        <Row
          gap="md"
          paddingH="lg"
          alignItems="center">
          <Text>🎵</Text>
          <Text>Audio Title</Text>
        </Row>
      )
      expect(screen.getByText('🎵')).toBeTruthy()
      expect(screen.getByText('Audio Title')).toBeTruthy()
    })

    it('should create a wrapping row for tags', () => {
      render(
        <Row
          wrap="wrap"
          gap="xs">
          <Text>Tag1</Text>
          <Text>Tag2</Text>
          <Text>Tag3</Text>
        </Row>
      )
      expect(screen.getByText('Tag1')).toBeTruthy()
      expect(screen.getByText('Tag2')).toBeTruthy()
      expect(screen.getByText('Tag3')).toBeTruthy()
    })
  })

  describe('Edge Cases', () => {
    it('should render with no props', () => {
      const {container} = render(<Row />)
      expect(container).toBeTruthy()
    })

    it('should render with empty children', () => {
      render(<Row testID="row">{null}</Row>)
      expect(screen.getByTestId('row')).toBeTruthy()
    })

    it('should render with single child', () => {
      render(
        <Row>
          <Text>Single</Text>
        </Row>
      )
      expect(screen.getByText('Single')).toBeTruthy()
    })

    it('should render with conditional children', () => {
      const showExtra = false
      render(
        <Row>
          <Text>Always</Text>
          {showExtra && <Text>Conditional</Text>}
        </Row>
      )
      expect(screen.getByText('Always')).toBeTruthy()
      expect(screen.queryByText('Conditional')).toBeNull()
    })
  })
})
