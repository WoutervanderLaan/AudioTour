# Style Tokens Usage Guide

This guide demonstrates how to use the standardized style combination tokens in your components.

## Overview

Style tokens provide pre-configured combinations of style properties that ensure visual consistency across the app. Instead of manually defining borders, shadows, and other common patterns in every component, you can use standardized tokens that reference the theme's color and size values.

## Available Style Tokens

### Border Styles (`theme.styles.border`)

| Token | Description | Properties |
|-------|-------------|------------|
| `default` | Standard border with medium radius | 1px border, theme border color, medium radius |
| `sharp` | Border with sharp corners | 1px border, theme border color, no radius |
| `rounded` | Pill-shaped border | 1px border, theme border color, extra large radius |
| `thick` | Emphasized border | 2px border, theme border color, medium radius |
| `none` | No border (transparent) | 0px border, transparent, no radius |

### Shadow Styles (`theme.styles.shadow`)

| Token | Description | Elevation |
|-------|-------------|-----------|
| `sm` | Subtle elevation | Small shadow (elevation 1) |
| `md` | Moderate elevation | Medium shadow (elevation 2) |
| `lg` | Strong elevation | Large shadow (elevation 3) |
| `none` | No shadow | No elevation |

### Card Styles (`theme.styles.card`)

| Token | Description |
|-------|-------------|
| `default` | Subtle card with border and small shadow |
| `elevated` | Floating card with strong shadow, no border |
| `outlined` | Flat card with border, no shadow |
| `flat` | Minimal card with background only |

### Input Styles (`theme.styles.input`)

| Token | Description |
|-------|-------------|
| `default` | Standard input styling |
| `focused` | Emphasized border for focus state |
| `error` | Warning border for error state |

## Usage Examples

### Basic Border Usage

```typescript
import {StyleSheet} from 'react-native-unistyles'

const styles = StyleSheet.create(theme => ({
  container: {
    ...theme.styles.border.default,
    padding: theme.size.md,
    backgroundColor: theme.color.screen.background.default,
  },
  roundedButton: {
    ...theme.styles.border.rounded,
    paddingVertical: theme.size.smd,
    paddingHorizontal: theme.size.lg,
  },
}))
```

### Card Components

```typescript
const styles = StyleSheet.create(theme => ({
  // Subtle card with shadow
  card: {
    ...theme.styles.card.default,
    padding: theme.size.lg,
    marginVertical: theme.size.sm,
  },

  // Elevated card for important content
  highlightCard: {
    ...theme.styles.card.elevated,
    padding: theme.size.xl,
  },

  // Simple outlined card
  outlinedCard: {
    ...theme.styles.card.outlined,
    padding: theme.size.md,
  },
}))
```

### Custom Combinations

You can combine multiple style tokens or override specific properties:

```typescript
const styles = StyleSheet.create(theme => ({
  // Combine card with custom shadow
  customCard: {
    ...theme.styles.card.flat,
    ...theme.styles.shadow.lg,
    padding: theme.size.lg,
  },

  // Use border but override color
  warningContainer: {
    ...theme.styles.border.thick,
    borderColor: theme.color.text.warning,
    padding: theme.size.md,
  },

  // Mix border and shadow
  elevatedContainer: {
    ...theme.styles.border.default,
    ...theme.styles.shadow.md,
    backgroundColor: theme.color.screen.background.default,
  },
}))
```

### Input Components

```typescript
import {useState} from 'react'
import {TextInput} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

const MyInput = () => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <TextInput
      style={[
        hasError
          ? styles.inputError
          : isFocused
            ? styles.inputFocused
            : styles.input
      ]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  )
}

const styles = StyleSheet.create(theme => ({
  input: {
    ...theme.styles.input.default,
  },
  inputFocused: {
    ...theme.styles.input.focused,
  },
  inputError: {
    ...theme.styles.input.error,
  },
}))
```

### Advanced Example: Modal with Multiple Styles

```typescript
const styles = StyleSheet.create(theme => ({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modal: {
    // Use elevated card as base
    ...theme.styles.card.elevated,
    ...theme.styles.shadow.lg,
    width: '80%',
    padding: theme.size.xl,
  },

  modalHeader: {
    ...theme.styles.border.none,
    borderBottomWidth: 1,
    borderBottomColor: theme.color.border.default,
    paddingBottom: theme.size.md,
    marginBottom: theme.size.md,
  },

  primaryButton: {
    ...theme.styles.border.rounded,
    backgroundColor: theme.color.pressable.primary.default.background,
    paddingVertical: theme.size.smd,
    paddingHorizontal: theme.size.lg,
  },

  secondaryButton: {
    ...theme.styles.border.rounded,
    backgroundColor: theme.color.pressable.secondary.default.background,
    borderColor: theme.color.pressable.secondary.default.border,
    paddingVertical: theme.size.smd,
    paddingHorizontal: theme.size.lg,
  },
}))
```

## Benefits

1. **Consistency**: All components using `theme.styles.card.default` will have identical styling
2. **Theme-aware**: Styles automatically adapt to light/dark mode
3. **Maintainability**: Update border/shadow styles in one place
4. **Type-safe**: Full TypeScript autocomplete for all style tokens
5. **Composable**: Mix and match tokens as needed
6. **Override-friendly**: Spread tokens first, then override individual properties

## Adding New Style Combinations

To add new style combinations, edit `src/themes/tokens/styles.ts`:

```typescript
// Add new style type
export type MyCustomStyles = {
  variant1: {
    // style properties
  }
  variant2: {
    // style properties
  }
}

// Add to StyleTokens type
export type StyleTokens = {
  border: BorderStyles
  shadow: ShadowStyles
  card: CardStyles
  input: InputStyles
  myCustom: MyCustomStyles // Add here
}

// Implement in createStyleTokens function
export const createStyleTokens = (
  color: ColorTokens,
  size: typeof sizeTokens,
): StyleTokens => {
  return {
    // ... existing tokens
    myCustom: {
      variant1: {
        // implementation using color and size tokens
      },
      variant2: {
        // implementation
      },
    },
  }
}
```

## Best Practices

1. **Prefer tokens over custom styles**: Use `theme.styles.card.default` instead of manually creating borders/shadows
2. **Spread first, override later**: Put token spreads before custom properties
3. **Combine thoughtfully**: Some combinations (like multiple borders) don't make sense
4. **Document custom combinations**: If you create a complex combination, add a comment explaining why
5. **Extend when needed**: If you find yourself repeating a pattern, add it to `styles.ts`

## Related Documentation

- Theme system: `src/themes/DOCS.md`
- Token definitions: `src/themes/tokens/DOCS.md`
- Color tokens: `src/themes/tokens/themeLight.ts`, `src/themes/tokens/themeDark.ts`
- Size tokens: `src/themes/tokens/size.ts`
