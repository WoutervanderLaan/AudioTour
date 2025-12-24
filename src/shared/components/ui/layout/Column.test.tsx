/* eslint-disable max-lines-per-function */
// eslint-disable-next-line no-restricted-imports
import {Text} from 'react-native'

import {render, screen} from '@testing-library/react-native'

import {Column} from './Column'

/**
 * Test suite for Column component
 */
describe('Column', () => {
  describe('Rendering', () => {
    it('should render children correctly', () => {
      render(
        <Column testID="TestColumn">
          <Text>Column content</Text>
        </Column>,
      )
      expect(screen.getByText('Column content')).toBeTruthy()
    })

    it('should render multiple children vertically', () => {
      render(
        <Column testID="TestColumn">
          <Text>First</Text>
          <Text>Second</Text>
          <Text>Third</Text>
        </Column>,
      )
      expect(screen.getByText('First')).toBeTruthy()
      expect(screen.getByText('Second')).toBeTruthy()
      expect(screen.getByText('Third')).toBeTruthy()
    })

    it('should render with testID', () => {
      render(<Column testID="TestColumn" />)
      expect(screen.getByTestId('TestColumnBox')).toBeTruthy()
    })
  })

  describe('Layout Direction', () => {
    it('should apply column flex direction', () => {
      render(<Column testID="TestColumn" />)
      const view = screen.getByTestId('TestColumnBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({flexDirection: 'column'}),
        ]),
      )
    })

    it('should always use column direction even without explicit column prop', () => {
      render(
        <Column testID="TestColumn">
          <Text>Content</Text>
        </Column>,
      )
      const view = screen.getByTestId('TestColumnBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({flexDirection: 'column'}),
        ]),
      )
    })
  })

  describe('Box Props', () => {
    it('should accept flex prop', () => {
      render(
        <Column
          testID="TestColumn"
          flex={1}
        />,
      )
      const view = screen.getByTestId('TestColumnBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({flex: 1})]),
      )
    })

    it('should accept center prop', () => {
      render(
        <Column
          testID="TestColumn"
          center
        />,
      )
      const view = screen.getByTestId('TestColumnBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            justifyContent: 'center',
            alignItems: 'center',
          }),
        ]),
      )
    })

    it('should accept gap prop', () => {
      render(
        <Column
          testID="TestColumn"
          gap="md"
        />,
      )
      expect(screen.getByTestId('TestColumnBox')).toBeTruthy()
    })

    it('should accept padding prop', () => {
      render(
        <Column
          testID="TestColumn"
          padding="lg"
        />,
      )
      expect(screen.getByTestId('TestColumnBox')).toBeTruthy()
    })

    it('should accept justifyContent prop', () => {
      render(
        <Column
          testID="TestColumn"
          justifyContent="space-evenly"
        />,
      )
      const view = screen.getByTestId('TestColumnBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({justifyContent: 'space-evenly'}),
        ]),
      )
    })

    it('should accept alignItems prop', () => {
      render(
        <Column
          testID="TestColumn"
          alignItems="flex-end"
        />,
      )
      const view = screen.getByTestId('TestColumnBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({alignItems: 'flex-end'}),
        ]),
      )
    })

    it('should accept stretch prop', () => {
      render(
        <Column
          testID="TestColumn"
          stretch
        />,
      )
      const view = screen.getByTestId('TestColumnBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({alignSelf: 'stretch'}),
        ]),
      )
    })
  })

  describe('Custom Styles', () => {
    it('should accept custom style prop', () => {
      const customStyle = {backgroundColor: 'green'}
      render(
        <Column
          testID="TestColumn"
          style={customStyle}
        />,
      )
      const view = screen.getByTestId('TestColumnBox')
      expect(view.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining(customStyle)]),
      )
    })

    it('should merge custom styles with Column styles', () => {
      const customStyle = {borderRadius: 8}
      render(
        <Column
          testID="TestColumn"
          gap="sm"
          style={customStyle}
        />,
      )
      const view = screen.getByTestId('TestColumnBox')
      expect(view.props.style).toEqual(expect.arrayContaining([customStyle]))
    })
  })

  describe('Common Use Cases', () => {
    it('should create a vertical menu', () => {
      render(
        <Column
          testID="TestColumn"
          gap="md"
          paddingV="lg">
          <Text>Option 1</Text>
          <Text>Option 2</Text>
          <Text>Option 3</Text>
        </Column>,
      )
      expect(screen.getByText('Option 1')).toBeTruthy()
      expect(screen.getByText('Option 2')).toBeTruthy()
      expect(screen.getByText('Option 3')).toBeTruthy()
    })

    it('should create a form column with fields', () => {
      render(
        <Column
          testID="TestColumn"
          gap="lg">
          <Text>Name Field</Text>
          <Text>Email Field</Text>
          <Text>Password Field</Text>
        </Column>,
      )
      expect(screen.getByText('Name Field')).toBeTruthy()
      expect(screen.getByText('Email Field')).toBeTruthy()
      expect(screen.getByText('Password Field')).toBeTruthy()
    })

    it('should create a card column with header, body, and footer', () => {
      render(
        <Column
          testID="TestColumn"
          gap="md"
          padding="lg">
          <Text>Header</Text>
          <Text>Body Content</Text>
          <Text>Footer</Text>
        </Column>,
      )
      expect(screen.getByText('Header')).toBeTruthy()
      expect(screen.getByText('Body Content')).toBeTruthy()
      expect(screen.getByText('Footer')).toBeTruthy()
    })

    it('should create a centered content column', () => {
      render(
        <Column
          testID="TestColumn"
          flex={1}
          center
          gap="xl">
          <Text>Centered Title</Text>
          <Text>Centered Subtitle</Text>
        </Column>,
      )
      expect(screen.getByText('Centered Title')).toBeTruthy()
      expect(screen.getByText('Centered Subtitle')).toBeTruthy()
    })
  })

  describe('Edge Cases', () => {
    it('should render with no props', () => {
      const {root} = render(<Column testID="TestColumn" />)
      expect(root).toBeTruthy()
    })

    it('should render with empty children', () => {
      render(<Column testID="TestColumn">{null}</Column>)
      expect(screen.getByTestId('TestColumnBox')).toBeTruthy()
    })

    it('should render with single child', () => {
      render(
        <Column testID="TestColumn">
          <Text>Single</Text>
        </Column>,
      )
      expect(screen.getByText('Single')).toBeTruthy()
    })

    it('should render with conditional children', () => {
      const showMiddle = true
      render(
        <Column testID="TestColumn">
          <Text>Top</Text>
          {showMiddle && <Text>Middle</Text>}
          <Text>Bottom</Text>
        </Column>,
      )
      expect(screen.getByText('Top')).toBeTruthy()
      expect(screen.getByText('Middle')).toBeTruthy()
      expect(screen.getByText('Bottom')).toBeTruthy()
    })
  })
})
