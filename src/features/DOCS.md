# src/features

Self-contained feature modules.

## Purpose

Each feature is a self-contained module representing a specific domain functionality. Features follow a consistent structure and can only import from `shared/` and `store/`.

## Feature Structure

Each feature folder should contain:

- **components/** - Feature-specific UI components
- **hooks/** - Feature-specific custom hooks
- **services/** - Feature-specific business logic
- **types/** - Feature-specific TypeScript types
- **index.ts** - Public API exports
- **DOCS.md** - Feature documentation (enforced by ESLint)

## Current Features

- **[auth/](./auth)** - Authentication and authorization
- **[user/](./user)** - User management and profile
- **[capture/](./capture)** - Photo capture and object recognition

## Import Rules

Features can only import from: shared, store
