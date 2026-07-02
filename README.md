# Expo / React Native Template

An opinionated, production-ready starter for Expo + React Native apps. It provides
the architecture, tooling, and a small set of reusable core modules so new projects
can start from a clean, well-structured foundation instead of a blank Expo app.

## What's Included

**Architecture & tooling**

- Expo (managed, New Architecture) + React Native + React
- Feature-based folder structure enforced by ESLint `boundaries` and custom rules
- Strict ESLint + Prettier + TypeScript (strict mode), with Husky + lint-staged pre-commit checks
- Jest (`jest-expo`) test setup and MSW for API mocking
- Storybook (on-device + web) for component development
- react-native-unistyles theme system with design tokens
- Zustand for global state, TanStack Query for data fetching, react-hook-form + Zod for forms
- A module-registry navigation system (React Navigation) where features self-register their tabs/stacks/modals

**Core modules**

- `auth` — login/register flow, auth store, token handling, API mocks
- `home` — default landing tab (placeholder to replace with your app)
- `onboarding` — multi-step, schema-validated onboarding flow (example content)
- `notifications` — push-notification permission flow, settings, and Notifee service layer

## Documentation

- [Folder Structure](./handbook/folder_structure.md)
- [GitHub Workflows](./.github/workflows/README.md)
- Architecture, conventions, and code-quality rules live in [CLAUDE.md](./CLAUDE.md)

## Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm (comes with Node.js)
- iOS Simulator (macOS only, via Xcode) and/or Android Studio
- Expo CLI (installed automatically via project dependencies)

### Use this template

1. Create a new repository from this template (GitHub → "Use this template"), or clone it.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Rename the app for your project:
   - `app.json` — `name`, `slug`, `scheme`
   - `app.config.js` — bundle identifiers and display names
   - `package.json` — `name`
   - Run `eas init` to generate a new EAS project id when you're ready to build.

4. Set up environment variables (optional):
   Create a `.env` file (see `.env.template`) to configure the API base URL:

   ```
   EXPO_PUBLIC_API_BASE_URL=http://localhost:8000
   ```

### Running the App

```bash
npm start                 # Expo dev server (development client)
npm run ios               # iOS (requires macOS + Xcode)
npm run android           # Android (requires Android Studio)
npm run web               # Web
npm run start:reset:cache # Clear cache and restart
```

### Development Tools

```bash
npm run lint          # Check for linting issues
npm run lint:fix      # Auto-fix linting issues
npm run format        # Check code formatting
npm run format:fix    # Auto-fix formatting issues
npm run typecheck     # Run TypeScript type checking
npm run validate      # Run all checks (lint, typecheck, format)
npm test              # Run tests
npm run storybook     # Start Storybook dev server on port 6006
```

### Build Variants

The app supports three build variants controlled by the `APP_VARIANT` environment variable:

- `development` - Bundle ID: `com.example.app.dev`
- `preview` - Bundle ID: `com.example.app.preview`
- `production` - Bundle ID: `com.example.app`

All npm scripts use the `development` variant by default. Update the identifiers in
`app.config.js` for your own project.

## Native Code (Prebuild)

This template uses Expo's Continuous Native Generation — the `ios/` and `android/`
folders are **not** committed. They are generated on demand from `app.json` /
`app.config.js` and config plugins:

- `npm run ios` / `npm run android` (via `expo run:*`) generate them automatically
- `npx expo prebuild` (or `npx expo prebuild --clean`) generates them explicitly
- EAS Build generates them in the cloud

Commit changes to `app.json`, `app.config.js`, and plugins rather than to the
generated native projects.

## Adding a Module

New features are self-contained modules under `src/modules/`. Copy the `auth` or
`home` module as a starting point: create `index.ts`, `screenConfig.ts`,
`routes.types.ts`, `screens/`, and a `DOCS.md`, then register the module in
`src/modules/modules.ts`. Modules may only import from `src/shared/` and
`src/store/`.
