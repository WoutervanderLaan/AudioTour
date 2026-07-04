# src/shared/components/ui/pressable/Button

Interactive button component with predefined styling variants.

## Purpose

Provides a styled button component built on top of PressableBase with theme-based variants (primary, secondary, tertiary, ghost, danger).

## Key Files

- **Button.tsx** - Main button component
- **Button.types.ts** - TypeScript type definitions
- **Button.test.tsx** - Component tests
- **Button.stories.tsx** - Storybook stories

## Props

- `label` - Button text label
- `variant` - Visual style variant (primary, secondary, tertiary, ghost, danger)
- `disabled` - Disabled state
- `testID` - Test identifier
- All PressableBase props (onPress, etc.)

## Usage

```tsx
import {Button} from '@/shared/components/ui/pressable/Button'

<Button label="Submit" variant="primary" onPress={handleSubmit} />
```
