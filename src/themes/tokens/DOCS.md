# src/themes/tokens

Design tokens for the theme system.

## Purpose

Contains individual design token definitions organized by category:

- **Colors** (brand, semantic, UI colors) - `color.ts`, `themeLight.ts`, `themeDark.ts`
- **Spacing and sizing scales** - `size.ts`
- **Typography** (font families, sizes, weights, line heights) - `text.ts`
- **Opacity values** - `opacity.ts`
- **Z-index layering** - `zIndex.ts`
- **Style combinations** (borders, shadows, cards, inputs) - `styles.ts`

## Key Files

### `styles.ts`

Provides reusable style combination tokens that bundle multiple style properties together for consistency. These include:

- **Border styles**: `default`, `sharp`, `rounded`, `thick`, `none`
- **Shadow styles**: `sm`, `md`, `lg`, `none`
- **Card styles**: `default`, `elevated`, `outlined`, `flat`
- **Input styles**: `default`, `focused`, `error`

Style combinations are created via `createStyleTokens()` factory function, which generates theme-aware style objects based on color and size tokens.

## Usage

### Basic Tokens

Tokens are imported and configured in `src/themes/themes.ts` and made available to all components through the react-native-unistyles theme system.

Components access tokens via the theme callback in `StyleSheet.create`:

```typescript
StyleSheet.create(theme => ({
  text: {
    color: theme.color.text.default,
    fontSize: theme.text.fontSize.body,
  },
  container: {
    padding: theme.size.md,
    backgroundColor: theme.color.screen.background.default,
  },
}))
```

### Style Combinations

Use style combination tokens by spreading them into your styles:

```typescript
StyleSheet.create(theme => ({
  card: {
    ...theme.styles.card.default,
    padding: theme.size.lg,
  },
  borderedContainer: {
    ...theme.styles.border.rounded,
    backgroundColor: theme.color.screen.background.default,
  },
  input: {
    ...theme.styles.input.default,
  },
  inputFocused: {
    ...theme.styles.input.focused,
  },
  elevatedCard: {
    ...theme.styles.card.elevated,
    ...theme.styles.shadow.lg,
  },
}))
```

This approach ensures visual consistency across the app while maintaining flexibility to override individual properties.
