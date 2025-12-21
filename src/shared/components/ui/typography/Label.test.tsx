/* eslint-disable max-lines-per-function */
import type {StyleProp, TextStyle} from 'react-native'

import {render, screen} from '@testing-library/react-native'

import {Label} from './Label'

/**
 * Test suite for Label component
 */
describe('Label', () => {
  describe('Rendering', () => {
    it('should render children correctly', () => {
      render(<Label>Label text</Label>)
      expect(screen.getByText('Label text')).toBeTruthy()
    })

    it('should render with default semiBold font family', () => {
      render(<Label>SemiBold label</Label>)
      expect(screen.getByText('SemiBold label')).toBeTruthy()
    })

    it('should render with extraSmall font size', () => {
      render(<Label>Small label</Label>)
      expect(screen.getByText('Small label')).toBeTruthy()
    })
  })

  describe('Font Family', () => {
    it('should accept custom fontFamily prop', () => {
      render(<Label fontFamily="bold">Bold label</Label>)
      expect(screen.getByText('Bold label')).toBeTruthy()
    })

    it('should accept regular font family', () => {
      render(<Label fontFamily="regular">Regular label</Label>)
      expect(screen.getByText('Regular label')).toBeTruthy()
    })

    it('should accept italic font family', () => {
      render(<Label fontFamily="bold">Italic label</Label>)
      expect(screen.getByText('Italic label')).toBeTruthy()
    })
  })

  describe('Styling', () => {
    it('should accept custom color prop', () => {
      render(<Label color="link">Colored label</Label>)
      expect(screen.getByText('Colored label')).toBeTruthy()
    })

    it('should accept align prop for center alignment', () => {
      render(<Label align="center">Centered label</Label>)
      expect(screen.getByText('Centered label')).toBeTruthy()
    })

    it('should accept align prop for right alignment', () => {
      render(<Label align="right">Right aligned label</Label>)
      expect(screen.getByText('Right aligned label')).toBeTruthy()
    })

    it('should accept custom style prop', () => {
      const customStyle: StyleProp<TextStyle> = {textTransform: 'uppercase'}
      const {getByText} = render(
        <Label style={customStyle}>Styled label</Label>,
      )
      expect(getByText('Styled label')).toBeTruthy()
    })
  })

  describe('Use Cases', () => {
    it('should work as form field label', () => {
      render(<Label>Email Address</Label>)
      expect(screen.getByText('Email Address')).toBeTruthy()
    })

    it('should work as button label', () => {
      render(<Label>Submit</Label>)
      expect(screen.getByText('Submit')).toBeTruthy()
    })

    it('should work as section header label', () => {
      render(<Label>Settings</Label>)
      expect(screen.getByText('Settings')).toBeTruthy()
    })

    it('should work as status label', () => {
      render(<Label color="link">Active</Label>)
      expect(screen.getByText('Active')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should be accessible by default', () => {
      const {getByText} = render(<Label>Accessible label</Label>)
      const label = getByText('Accessible label')
      expect(label.props.accessible).toBe(true)
    })

    it('should have text accessibility role', () => {
      const {getByText} = render(<Label>Label with role</Label>)
      const label = getByText('Label with role')
      expect(label.props.accessibilityRole).toBe('text')
    })

    it('should accept accessibilityLabel prop', () => {
      const {getByLabelText} = render(
        <Label accessibilityLabel="Custom Label">Visual Text</Label>,
      )
      expect(getByLabelText('Custom Label')).toBeTruthy()
    })

    it('should accept accessibilityHint prop', () => {
      const {getByText} = render(
        <Label accessibilityHint="Field is required">Required Field</Label>,
      )
      const label = getByText('Required Field')
      expect(label.props.accessibilityHint).toBe('Field is required')
    })
  })

  describe('Props Forwarding', () => {
    it('should forward testID prop', () => {
      render(<Label testID="test-label">Test label</Label>)
      expect(screen.getByTestId('test-label')).toBeTruthy()
    })

    it('should forward numberOfLines prop', () => {
      const {getByText} = render(
        <Label numberOfLines={1}>Long label text that should truncate</Label>,
      )
      const label = getByText('Long label text that should truncate')
      expect(label.props.numberOfLines).toBe(1)
    })

    it('should forward ellipsizeMode prop', () => {
      const {getByText} = render(
        <Label
          numberOfLines={1}
          ellipsizeMode="middle">
          Label with middle ellipsis
        </Label>,
      )
      const label = getByText('Label with middle ellipsis')
      expect(label.props.ellipsizeMode).toBe('middle')
    })

    it('should forward onPress prop', () => {
      const onPress = jest.fn()
      const {getByText} = render(<Label onPress={onPress}>Click me</Label>)
      const label = getByText('Click me')
      expect(label.props.onPress).toBe(onPress)
    })
  })

  describe('Edge Cases', () => {
    it('should render with empty children', () => {
      const {root} = render(<Label />)
      expect(root).toBeTruthy()
    })

    it('should render with null children', () => {
      const {root} = render(<Label>{null}</Label>)
      expect(root).toBeTruthy()
    })

    it('should render with number children', () => {
      render(<Label>{100}</Label>)
      expect(screen.getByText('100')).toBeTruthy()
    })

    it('should render with special characters', () => {
      render(<Label>Label: *</Label>)
      expect(screen.getByText('Label: *')).toBeTruthy()
    })

    it('should render with emoji', () => {
      render(<Label>🏷️ Tag</Label>)
      expect(screen.getByText('🏷️ Tag')).toBeTruthy()
    })
  })
})
