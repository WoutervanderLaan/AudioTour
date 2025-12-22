# Pressable Components

This folder contains the base pressable components for the application. All interactive pressable elements in the app should use these components instead of React Native's Pressable or Button components directly.

## Components

### PressableBase

The base pressable component with accessibility features and theme integration. All other pressable components are built on top of this.

**Features:**

- Full React Native Pressable props support
- Accessibility built-in (accessible by default, role="button")
- Styled with react-native-unistyles
- State-based styling support (pressed, disabled, etc.)

**Usage:**

```tsx
import {PressableBase} from '@/shared/components/ui/pressable/PressableBase'
;<PressableBase onPress={() => console.log('Pressed')}>
  <Text.Label>Press me</Text.Label>
</PressableBase>
```

### Button

Interactive button component with predefined styling variants.

**Features:**

- Visual variants (primary, secondary)
- Theme-aware colors from pressable color tokens
- Disabled state support with opacity
- State-based styling (pressed, default)
- Border radius and padding from size tokens
- Inherits all PressableBase component features

**Usage:**

```tsx
import {Button} from '@/shared/components/ui/pressable/Button'

<Button
  variant="primary"
  onPress={() => console.log('Clicked')}
  label="Primary Button"
  />

<Button
  variant="secondary"
  disabled
  label="Disabled Button"
  />
```

### IconButton

A pressable icon button component for navigation and actions.

**Features:**

- Material Icons integration via @expo/vector-icons
- Multiple size variants (sm, md, lg)
- Theme-aware icon colors
- Disabled state support
- Optional color override
- State-based styling (pressed, default)
- Inherits all PressableBase component features

**Usage:**

```tsx
import {IconButton} from '@/shared/components/ui/pressable/IconButton'

<IconButton
  name="arrow-back"
  size="md"
  onPress={() => navigation.goBack()}
  />

<IconButton
  name="settings"
  size="lg"
  color="#FF0000"
  onPress={() => navigation.navigate('Settings')}
  />

<IconButton
  name="delete"
  size="sm"
  disabled
  />
```

### LinkButton

A text-styled pressable component that looks like a hyperlink.

**Features:**

- Hyperlink-styled text appearance
- Theme-aware text colors (link color)
- Customizable text variant
- Underline on press for visual feedback
- Disabled state support with opacity
- Inherits all PressableBase component features

**Usage:**

```tsx
import {LinkButton} from '@/shared/components/ui/pressable/LinkButton'

<LinkButton
  label="Sign up"
  onPress={() => navigation.navigate('Register')}
  />

<LinkButton
  label="Forgot password?"
  textVariant="SmallLabel"
  onPress={() => navigation.navigate('ForgotPassword')}
  />

<LinkButton
  label="Learn more"
  disabled
  />
```

## Design Pattern

These components follow the same pattern as the Box/Row/Column layout components and the typography components:

- **PressableBase** is the base component (like Box or TextBase)
- **Button** is a specific variant (like Row/Column or Label/Title/Paragraph)
- All components use react-native-unistyles for theming
- All components support full accessibility features
- All components use theme color tokens for consistent styling

## Theme Integration

The components use the following theme tokens:

- `theme.color.pressable.primary.*` - Primary button colors (background, border, label)
- `theme.color.pressable.secondary.*` - Secondary button/inactive toggle colors
- `theme.size.*` - Spacing (padding, border radius)

Each color variant has `default` and `pressed` states for interactive feedback.

## ESLint Rule

The ESLint configuration enforces that all React Native Pressable and Button components must be imported from this module, not from 'react-native' directly (except within PressableBase.tsx where the rule is disabled).

Direct usage of PressableBase is also restricted - use Button, or create a new specific component instead.
