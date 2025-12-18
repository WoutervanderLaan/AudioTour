# Source Directory (`src`)

This directory contains the core source files for the project. It follows a strict feature-based architecture enforced by ESLint boundaries plugin.

## Subdirectories

- **[app](./app)**: Application-level configuration, initialization, and navigation setup. Includes providers, navigation config, and app entry points.
- **[core](./core)**: Core infrastructure including API client, navigation system, and shared utilities.
- **[modules](./modules)**: Self-contained feature modules (auth, notifications, onboarding, profile, tour). Each module has its own navigation, screens, hooks, store, and types.
- **[shared](./shared)**: Reusable components, utilities, hooks, and resources shared across the application. Includes UI components, context providers, and library utilities.
- **[store](./store)**: Global Zustand state management with slices and middleware.
- **[themes](./themes)**: Theme configuration, styling tokens, and unistyles setup.

## Import Rules

- **app/** can import from: shared, modules, store, themes
- **modules/** can import from: shared, store only
- **shared/** can import from: themes only
- **store/** can import from: shared only
- **core/** can import from: shared only

Use absolute imports with `@/*` alias (never use `../` parent imports).

## Additional Files

- `types.d.ts`: Global TypeScript definitions used throughout the source files.
