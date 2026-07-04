# src/shared/components/ui/typography/Label

Semantic label component for form labels and UI labels.

## Purpose

Provides a small, semi-bold text component designed for form field labels and UI element labels. Built on TextBase with predefined typography settings.

## Key Files

- **Label.tsx** - Main label component
- **Label.types.ts** - TypeScript type definitions
- **Label.test.tsx** - Component tests
- **Label.stories.tsx** - Storybook stories

## Props

- `children` - Label text content
- `fontFamily` - Font weight variant (defaults to 'semiBold')
- All TextBase props (color, style, etc.)

## Usage

```tsx
import {Text} from '@/shared/components/ui/typography/Text'

<Text.Label>Email Address</Text.Label>
```
