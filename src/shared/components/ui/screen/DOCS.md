# Screen Component

## Overview

The `Screen` component is a reusable wrapper for all screen content in the application. It provides consistent handling of safe areas, scrolling, keyboard avoidance, and padding across all screens.

## Features

- **Safe Area Integration**: Automatically handles safe area insets (top/bottom)
- **Scrolling Support**: Optional scrollable content with ScrollView
- **Keyboard Avoidance**: Built-in KeyboardAvoidingView support for forms
- **Theme Integration**: Uses unistyles for consistent theming
- **Flexible Padding**: Configurable gutters (top, bottom, horizontal)
- **Accessibility**: Proper accessibility props and structure
- **React Navigation Compatible**: Works seamlessly with React Navigation screens

## Usage

```tsx
import {Screen} from '@/shared/components/ui/screen'

// Basic usage
<Screen>
  <Text>Screen content</Text>
</Screen>

// Scrollable screen
<Screen scroll>
  <Text>Long content that needs scrolling</Text>
</Screen>

// Screen with keyboard avoidance (for forms)
<Screen scroll keyboardAvoidingView>
  <TextInput placeholder="Email" />
  <TextInput placeholder="Password" />
</Screen>

// Screen with custom padding
<Screen
  gutterTop={false}
  gutterBottom={false}
  gutterHorizontal={true}>
  <Text>Custom padding</Text>
</Screen>

// Screen with different background
<Screen backgroundColor="settings">
  <Text>Settings screen</Text>
</Screen>
```

## Props

- `children` (ReactNode, required): Content to render inside the screen
- `scroll` (boolean, default: false): Enable scrollable content
- `keyboardAvoidingView` (boolean, default: false): Enable keyboard avoidance
- `gutterTop` (boolean, default: true): Add top padding
- `gutterBottom` (boolean, default: true): Add bottom padding
- `gutterHorizontal` (boolean, default: true): Add horizontal padding
- `withTopInset` (boolean, default: false): Include safe area top inset
- `withBottomInset` (boolean, default: true): Include safe area bottom inset
- `backgroundColor` ('default' | 'settings', default: 'default'): Theme background color
- `testID` (string): Test identifier for testing
- Additional ViewProps are supported

## Accessibility

The Screen component is designed with accessibility in mind:

- Proper semantic structure
- Support for screen readers
- Keyboard navigation support (when using forms)
- Safe area handling for all device types

## Integration with React Navigation

The Screen component works seamlessly with React Navigation. Simply wrap your screen content:

```tsx
export const MyScreen = (): React.JSX.Element => {
  return (
    <Screen>
      <Text>My Screen Content</Text>
    </Screen>
  )
}
```

## Theme Integration

The component uses unistyles theme tokens:

- Background colors: `theme.color.screen.background.default` or `theme.color.screen.background.settings`
- Spacing: `theme.size.spacing.md` for gutters
