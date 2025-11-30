# src/shared/components

Reusable component library.

## Structure

- **[ui/](./ui)** - Generic UI components (Pressable, Typography, Form, Layout, Screen)
- **[features/](./features)** - Complex reusable features (AudioPlayer, Toast)

## UI vs Features

**ui/** - Simple, presentational components

- Building blocks for the app
- Minimal logic
- Examples: Button, Input, Text, Layout components

**features/** - Complex, stateful components

- Self-contained functionality
- May include internal state and logic
- Examples: AudioPlayer, Toast system

Both are generic and not tied to specific business features.
