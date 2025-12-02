# Source Directory (`src`)

This directory contains the core source files for the project. It follows a strict feature-based architecture enforced by ESLint boundaries plugin.

## Subdirectories

- **[app](./app)**: Application-level configuration, initialization, and navigation setup. Includes providers, navigation config, and app entry points.
- **[features](./features)**: Self-contained feature modules (auth, user, capture). Each feature has its own components, hooks, services, and types. TODO: deprecated, needs update
- **[shared](./shared)**: Reusable components, utilities, hooks, and resources shared across the application. Includes UI components, context providers, and library utilities.
- **[store](./store)**: Global Zustand state management with slices and middleware.
- **[themes](./themes)**: Theme configuration, styling tokens, and unistyles setup.

## Import Rules

- **app/** can import from: shared, features, store, themes TODO: deprecated, needs update
- **features/** can import from: shared, store only TODO: deprecated, needs update
- **shared/** can import from: themes only
- **store/** can import from: shared only

Use absolute imports with `@/*` alias (never use `../` parent imports).

## Additional Files

- `types.d.ts`: Global TypeScript definitions used throughout the source files.
