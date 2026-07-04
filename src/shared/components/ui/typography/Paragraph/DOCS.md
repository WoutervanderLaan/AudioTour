# src/shared/components/ui/typography/Paragraph

Semantic paragraph component for body text.

## Purpose

Provides a text component designed for body content and paragraphs. Built on TextBase with predefined typography settings for various text sizes.

## Key Files

- **Paragraph.tsx** - Main paragraph component
- **Paragraph.types.ts** - TypeScript type definitions
- **Paragraph.test.tsx** - Component tests
- **Paragraph.stories.tsx** - Storybook stories

## Props

- `children` - Paragraph text content
- `variant` - Size variant (body, small, large, etc.)
- `fontFamily` - Font weight variant (defaults to 'regular')
- All TextBase props (color, style, etc.)

## Usage

```tsx
import {Text} from '@/shared/components/ui/typography/Text'

<Text.Paragraph variant="body">
  This is body text content.
</Text.Paragraph>
```
