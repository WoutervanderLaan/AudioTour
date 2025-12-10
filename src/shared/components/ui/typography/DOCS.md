# Typography Components

This folder contains the base text components for the application. All text in the app should use these components instead of React Native's Text component directly.

## Components

### TextBase

The base text component with accessibility features and theme integration. All other text components are built on top of this.
This component should not be used directly, except by typography components build on top of it.

**Features:**

- Full React Native Text props support
- Theme-aware colors from color tokens
- Theme-aware font sizes and line heights
- Theme-aware font families
- Text alignment support
- Accessibility built-in (accessible by default, role="text")
- Styled with react-native-unistyles

**Usage:**

```tsx
import {TextBase} from '@/shared/components/ui/typography/TextBase'

<TextBase color="default" fontSize="body">Hello World</TextBase>
<TextBase color="secondary" fontFamily="bold">Bold text</TextBase>
```

### Text.Title

Semantic heading component for titles (h1-h6).

**Features:**

- Predefined heading levels (h1-h6)
- Bold font family by default
- Accessibility role="header"
- Inherits all Text component features

**Usage:**

```tsx
import {Text.Title} from '@/shared/components/ui/typography'

<Text.Title level="h1">Main Text.Title</Text.Title>
<Text.Title level="h2" bold={false}>Subtitle</Text.Title>
```

### Text.Paragraph

Semantic paragraph component for body text.

**Features:**

- Paragraph variants (body, intro, quote, small, extraSmall)
- Predefined typography settings per variant
- Inherits all Text component features

**Usage:**

```tsx
import {Text.Paragraph} from '@/shared/components/ui/typography'

<Text.Paragraph variant="body">This is body text.</Text.Paragraph>
<Text.Paragraph variant="intro">This is intro text.</Text.Paragraph>
<Text.Paragraph variant="small">This is small text.</Text.Paragraph>
```

### Text.Label

Semantic label component for form labels and UI labels.

**Features:**

- Small text size by default
- Inherits all Text component features

**Usage:**

```tsx
import {Text} from '@/shared/components/ui/typography'
;<Text.Label color="secondary">Field Text.Label</Text.Label>
```

## Design Pattern

These components follow the same pattern as the Box/Row/Column layout components:

- **Text** is the base component (like Box)
- **Text.Title**, **Text.Paragraph**, **Text.Label** are specific variants (like Row/Column)
- All components use react-native-unistyles for theming
- All components support full accessibility features

## ESLint Rule

The ESLint configuration enforces that all React Native Text components must be imported from this module, not from 'react-native' directly (except within this file where the rule is disabled).
