# src/themes

Theme configuration and styling system.

## Contents

- **[tokens/](./tokens)** - Individual theme tokens (colors, spacing, typography, etc.)
- **unistyles.ts** - react-native-unistyles configuration with adaptive themes

## Purpose

Centralizes all theming and styling configuration for the app using react-native-unistyles v3. Provides:

- Design token system
- Theme configuration
- Adaptive theming support
- Type-safe styling

## Usage

All components should use `StyleSheet.create` from `react-native-unistyles` (not from `react-native`) to access theme tokens and create styles.

Never use:

- Inline styles (ESLint warning)
- Color literals (ESLint warning)
- `StyleSheet` from `react-native`
