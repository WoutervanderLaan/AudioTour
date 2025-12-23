import {render, screen} from '@testing-library/react-native'

import {Title} from './Title'

/**
 * Test suite for Title component
 */
describe('Title', () => {
  describe('Rendering', () => {
    it('should render children correctly', () => {
      render(<Title>Title Text</Title>)
      expect(screen.getByText('Title Text')).toBeTruthy()
    })

    it('should render with default h1 level', () => {
      const {getByText} = render(<Title>Default Title</Title>)
      const title = getByText('Default Title')
      expect(title).toBeTruthy()
      expect(title.props.accessibilityRole).toBe('header')
    })

    it('should render with default headingBold font family', () => {
      render(<Title>Bold Title</Title>)
      expect(screen.getByText('Bold Title')).toBeTruthy()
    })
  })

  describe('Heading Levels', () => {
    it('should render h1 level', () => {
      render(<Title level="h1">H1 Title</Title>)
      expect(screen.getByText('H1 Title')).toBeTruthy()
    })

    it('should render h2 level', () => {
      render(<Title level="h2">H2 Title</Title>)
      expect(screen.getByText('H2 Title')).toBeTruthy()
    })

    it('should render h3 level', () => {
      render(<Title level="h3">H3 Title</Title>)
      expect(screen.getByText('H3 Title')).toBeTruthy()
    })

    it('should render h4 level', () => {
      render(<Title level="h4">H4 Title</Title>)
      expect(screen.getByText('H4 Title')).toBeTruthy()
    })

    it('should render h5 level', () => {
      render(<Title level="h5">H5 Title</Title>)
      expect(screen.getByText('H5 Title')).toBeTruthy()
    })

    it('should render h6 level', () => {
      render(<Title level="h6">H6 Title</Title>)
      expect(screen.getByText('H6 Title')).toBeTruthy()
    })
  })

  describe('Font Family', () => {
    it('should accept custom fontFamily prop', () => {
      render(<Title fontFamily="regular">Regular Title</Title>)
      expect(screen.getByText('Regular Title')).toBeTruthy()
    })

    it('should accept bold font family', () => {
      render(<Title fontFamily="bold">Bold Custom Title</Title>)
      expect(screen.getByText('Bold Custom Title')).toBeTruthy()
    })
  })

  describe('Styling', () => {
    it('should accept custom color prop', () => {
      render(<Title color="link">Colored Title</Title>)
      expect(screen.getByText('Colored Title')).toBeTruthy()
    })

    it('should accept align prop', () => {
      render(<Title align="center">Centered Title</Title>)
      expect(screen.getByText('Centered Title')).toBeTruthy()
    })

    it('should accept custom style prop', () => {
      const customStyle = {opacity: 0.8}
      const {getByText} = render(
        <Title style={customStyle}>Styled Title</Title>,
      )
      expect(getByText('Styled Title')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('should have accessibility role header', () => {
      const {getByText} = render(<Title>Accessible Title</Title>)
      const title = getByText('Accessible Title')
      expect(title.props.accessibilityRole).toBe('header')
    })

    it('should accept accessibilityLabel prop', () => {
      const {getByLabelText} = render(
        <Title accessibilityLabel="Custom Header Label">Title</Title>,
      )
      expect(getByLabelText('Custom Header Label')).toBeTruthy()
    })

    it('should be accessible by default', () => {
      const {getByText} = render(<Title>Accessible by default</Title>)
      const title = getByText('Accessible by default')
      expect(title.props.accessible).toBe(true)
    })
  })

  describe('Props Forwarding', () => {
    it('should forward testID prop', () => {
      render(<Title testID="test-title">Test Title</Title>)
      expect(screen.getByTestId('test-title')).toBeTruthy()
    })

    it('should forward numberOfLines prop', () => {
      const {getByText} = render(
        <Title numberOfLines={1}>
          Long title that should be truncated after one line
        </Title>,
      )
      const title = getByText(
        'Long title that should be truncated after one line',
      )
      expect(title.props.numberOfLines).toBe(1)
    })

    it('should forward ellipsizeMode prop', () => {
      const {getByText} = render(
        <Title
          numberOfLines={1}
          ellipsizeMode="middle">
          Title with ellipsis
        </Title>,
      )
      const title = getByText('Title with ellipsis')
      expect(title.props.ellipsizeMode).toBe('middle')
    })
  })

  describe('Edge Cases', () => {
    it('should render with empty children', () => {
      const {root} = render(<Title />)
      expect(root).toBeTruthy()
    })

    it('should render with number children', () => {
      render(<Title>{42}</Title>)
      expect(screen.getByText('42')).toBeTruthy()
    })

    it('should render with mixed content', () => {
      render(
        <Title testID="Title1">
          Part 1{' '}
          <Title
            level="h2"
            testID="Title2">
            Part 2
          </Title>
        </Title>,
      )
      expect(screen.getByTestId('Title1')).toHaveStyle({fontSize: 32})
      expect(screen.getByTestId('Title1')).toBeOnTheScreen()
      expect(screen.getByTestId('Title2')).toHaveStyle({fontSize: 28})
      expect(screen.getByTestId('Title2')).toBeOnTheScreen()
    })
  })
})
