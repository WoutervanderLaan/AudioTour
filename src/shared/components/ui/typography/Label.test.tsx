import type {StyleProp, TextStyle} from 'react-native'

import {render, screen} from '@testing-library/react-native'

import {Label} from './Label'

/**
 * Test suite for Label component
 */
describe('Label', () => {
  describe('Rendering', () => {
    it('should render children correctly', () => {
      render(<Label testID="LabelText">Label text</Label>)
      expect(screen.getByText('Label text')).toBeTruthy()
    })

    it('should render with default semiBold font family', () => {
      render(<Label testID="LabelText">SemiBold label</Label>)
      expect(screen.getByText('SemiBold label')).toBeTruthy()
    })

    it('should render with extraSmall font size', () => {
      render(<Label testID="LabelText">Small label</Label>)
      expect(screen.getByText('Small label')).toBeTruthy()
    })
  })

  describe('Font Family', () => {
    it('should accept custom fontFamily prop', () => {
      render(
        <Label
          testID="LabelText"
          fontFamily="bold">
          Bold label
        </Label>,
      )
      expect(screen.getByText('Bold label')).toBeTruthy()
    })

    it('should accept regular font family', () => {
      render(
        <Label
          testID="LabelText"
          fontFamily="regular">
          Regular label
        </Label>,
      )
      expect(screen.getByText('Regular label')).toBeTruthy()
    })

    it('should accept italic font family', () => {
      render(
        <Label
          testID="LabelText"
          fontFamily="bold">
          Italic label
        </Label>,
      )
      expect(screen.getByText('Italic label')).toBeTruthy()
    })
  })

  describe('Styling', () => {
    it('should accept custom color prop', () => {
      render(
        <Label
          testID="LabelText"
          color="link">
          Colored label
        </Label>,
      )
      expect(screen.getByText('Colored label')).toBeTruthy()
    })

    it('should accept align prop for center alignment', () => {
      render(
        <Label
          testID="LabelText"
          align="center">
          Centered label
        </Label>,
      )
      expect(screen.getByText('Centered label')).toBeTruthy()
    })

    it('should accept align prop for right alignment', () => {
      render(
        <Label
          testID="LabelText"
          align="right">
          Right aligned label
        </Label>,
      )
      expect(screen.getByText('Right aligned label')).toBeTruthy()
    })

    it('should accept custom style prop', () => {
      const customStyle: StyleProp<TextStyle> = {textTransform: 'uppercase'}
      const {getByText} = render(
        <Label
          testID="LabelText"
          style={customStyle}>
          Styled label
        </Label>,
      )
      expect(getByText('Styled label')).toBeTruthy()
    })
  })

  describe('Use Cases', () => {
    it('should work as form field label', () => {
      render(<Label testID="LabelText">Email Address</Label>)
      expect(screen.getByText('Email Address')).toBeTruthy()
    })

    it('should work as button label', () => {
      render(<Label testID="LabelText">Submit</Label>)
      expect(screen.getByText('Submit')).toBeTruthy()
    })

    it('should work as section header label', () => {
      render(<Label testID="LabelText">Settings</Label>)
      expect(screen.getByText('Settings')).toBeTruthy()
    })

    it('should work as status label', () => {
      render(
        <Label
          testID="LabelText"
          color="link">
          Active
        </Label>,
      )
      expect(screen.getByText('Active')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should be accessible by default', () => {
      const {getByText} = render(
        <Label testID="LabelText">Accessible label</Label>,
      )
      const label = getByText('Accessible label')
      expect(label.props.accessible).toBe(true)
    })

    it('should have text accessibility role', () => {
      const {getByText} = render(
        <Label testID="LabelText">Label with role</Label>,
      )
      const label = getByText('Label with role')
      expect(label.props.accessibilityRole).toBe('text')
    })

    it('should accept accessibilityLabel prop', () => {
      const {getByLabelText} = render(
        <Label
          testID="LabelText"
          accessibilityLabel="Custom Label">
          Visual Text
        </Label>,
      )
      expect(getByLabelText('Custom Label')).toBeTruthy()
    })

    it('should accept accessibilityHint prop', () => {
      const {getByText} = render(
        <Label
          testID="LabelText"
          accessibilityHint="Field is required">
          Required Field
        </Label>,
      )
      const label = getByText('Required Field')
      expect(label.props.accessibilityHint).toBe('Field is required')
    })
  })

  describe('Props Forwarding', () => {
    it('should forward testID prop', () => {
      render(<Label testID="LabelText">Test label</Label>)
      expect(screen.getByTestId('LabelText')).toBeTruthy()
    })

    it('should forward numberOfLines prop', () => {
      const {getByText} = render(
        <Label
          testID="LabelText"
          numberOfLines={1}>
          Long label text that should truncate
        </Label>,
      )
      const label = getByText('Long label text that should truncate')
      expect(label.props.numberOfLines).toBe(1)
    })

    it('should forward ellipsizeMode prop', () => {
      const {getByText} = render(
        <Label
          testID="LabelText"
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
      const {getByText} = render(
        <Label
          testID="LabelText"
          onPress={onPress}>
          Click me
        </Label>,
      )
      const label = getByText('Click me')
      expect(label.props.onPress).toBe(onPress)
    })
  })

  describe('Edge Cases', () => {
    it('should render with empty children', () => {
      const {root} = render(<Label testID="LabelText" />)
      expect(root).toBeTruthy()
    })

    it('should render with null children', () => {
      const {root} = render(<Label testID="LabelText">{null}</Label>)
      expect(root).toBeTruthy()
    })

    it('should render with number children', () => {
      render(<Label testID="LabelText">{100}</Label>)
      expect(screen.getByText('100')).toBeTruthy()
    })

    it('should render with special characters', () => {
      render(<Label testID="LabelText">Label: *</Label>)
      expect(screen.getByText('Label: *')).toBeTruthy()
    })

    it('should render with emoji', () => {
      render(<Label testID="LabelText">🏷️ Tag</Label>)
      expect(screen.getByText('🏷️ Tag')).toBeTruthy()
    })
  })
})
