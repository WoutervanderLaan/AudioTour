# src/themes/tokens

Design tokens for the theme system.

## Purpose

Contains individual design token definitions organized by category:

- Colors (brand, semantic, UI colors)
- Spacing and sizing scales
- Typography (font families, sizes, weights, line heights)
- Border radius values
- Shadow/elevation styles
- Animation/transition values

## Usage

Tokens are imported and configured in `src/themes/unistyles.ts` and made available to all components through the react-native-unistyles theme system.

Components access tokens via the theme callback in `StyleSheet.create`.
