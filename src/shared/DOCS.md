# src/shared

Reusable components, utilities, and resources shared across the application.

## Contents

- **[components/](./components)** - Reusable UI components and complex features
- **[context/](./context)** - React Context providers (Keyboard, Toast)
- **[hooks/](./hooks)** - Shared custom React hooks
- **[constants/](./constants)** - Shared constants
- **[utils/](./utils)** - Utility functions
- **[types/](./types)** - Global TypeScript type definitions

## Purpose

Contains generic, reusable code that is NOT specific to any feature. Everything in `shared/` should be:

- Generic and reusable
- Not tied to specific business logic
- Potentially usable in other projects

## Import Rules

Shared code can only import from: themes

This ensures shared code remains generic and doesn't depend on application-specific features or state.
