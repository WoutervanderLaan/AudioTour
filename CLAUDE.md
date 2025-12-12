# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An AI-powered React Native app that generates dynamic audio tours based on museum objects photographed by users. The app combines object recognition, contextual narrative generation, and personalized story sequences to offer engaging and interactive museum experiences.

## Development Commands

### Running the App

- `npm start` - Start Expo dev server with development client
- `npm run start:reset:cache` - Start with cleared cache
- `npm run ios` - Run on iOS device
- `npm run android` - Run on Android
- `npm run web` - Run web version

### Development Tools

- `npm run lint` - Run ESLint on src files
- `npm run lint:fix` - Auto-fix linting issues
- `npm run typecheck` - Run TypeScript compiler check (no emit)
- `npm run format` - Check code formatting with Prettier
- `npm run format:fix` - Auto-fix formatting issues
- `npm run validate` - Run lint, typecheck, and format checks together
- `npm test` - Run Jest tests in watch mode

### Storybook

- `npm run storybook` - Start Storybook dev server on port 6006
- `npm run storybook-generate` - Generate Storybook stories list
- `npm run build-storybook` - Build static Storybook
- Toggle between app and Storybook in development using the Expo dev menu item "Toggle Storybook"

### Other

- `npm run clean` - Clean React Native project artifacts

## Architecture

### Core Stack

- **Framework**: React Native 0.81.5 with Expo 54, React 19.1.0
- **Navigation**: React Navigation 7 with static navigation config (bottom tabs + native stack)
- **State Management**: Zustand v5 for global state, React Context for UI state providers
- **Data Fetching**: TanStack Query (React Query) v5
- **Styling**: react-native-unistyles v3 (custom theme system with tokens)
- **Forms**: react-hook-form v7 with Zod validation
- **Testing**: Jest with jest-expo preset
- **API Mocking**: MSW (Mock Service Worker) v2

### Feature-Based Architecture

The codebase follows a strict feature-based architecture enforced by ESLint boundaries plugin:

```
src/
├── app/              # App-wide setup: providers, navigation, initialization
│   └── init/        # App initialization logic
├── core/             # Core application infrastructure
│   ├── api/         # API client, configuration, and mocks
│   ├── lib/         # Core utilities and logger
│   └── navigation/  # Navigation setup and module registry
├── shared/           # Reusable, generic components and utilities
│   ├── components/
│   │   ├── ui/      # Generic UI components
│   │   └── features/ # Complex reusable features
│   ├── constants/   # Shared constants
│   ├── context/     # React Context providers
│   ├── hooks/       # Shared custom hooks
│   ├── types/       # Global TypeScript types
│   └── utils/       # Utility functions
├── modules/          # Self-contained feature modules
│   ├── auth/        # Authentication module
│   ├── onboarding/  # User onboarding module
│   ├── profile/     # User profile module
│   └── old/         # Legacy screens (to be migrated)
├── store/            # Global Zustand state management
│   └── slices/      # Store slices
└── themes/          # Theme configuration and tokens
    └── tokens/      # Individual theme tokens
```

### Import Rules (Enforced by ESLint)

- **app/** can import from: shared, module, store, themes
- **module/** can import from: shared, store only
- **shared/** can import from: themes only
- **store/** can import from: shared only
- Use absolute imports with `@/*` alias (never use `../` parent imports)
- Always use `StyleSheet` from `react-native-unistyles`, never from `react-native`

### API Integration

The app uses a custom `ApiClient` class (src/core/api/client.ts) with TanStack Query for data fetching:

- **ApiClient**: Generic HTTP client with interceptors, auth token management, and FormData support
- **TanStack Query**: Used throughout for queries and mutations (caching, refetching, state management)
- **Endpoints**:
  - Photo upload for object recognition (`/process-artwork`)
  - Narrative generation (`/generate-narrative`)
  - Audio generation (`/generate-audio`)
  - Museum object listing (`/museum-objects/:id`)
  - Personalized recommendations (`/recommendations`)

API base URL is configured via `EXPO_PUBLIC_API_BASE_URL` environment variable (defaults to `http://localhost:8000` in dev).

### App Configuration

The app supports three build variants controlled by `APP_VARIANT` environment variable:

- `development` - Bundle ID: com.woutervanderlaan.audiotour.dev
- `preview` - Bundle ID: com.woutervanderlaan.audiotour.preview
- `production` - Bundle ID: com.woutervanderlaan.audiotour

Configuration is in app.config.js.

### Navigation Structure

Modular navigation system with TypeScript safety:

- Navigation routes are registered dynamically through the ModuleRegistry
- Each module defines its own routes via route type files (e.g., `routes.types.ts`) and `screenConfig.ts` files
- Modules export Stack components that are composed into the RootNavigator
- Deep linking configured in src/core/navigation/linking.ts

### Code Quality

The project has strict ESLint rules enforcing:

- Function documentation comments (JSDoc style)
- Type documentation comments
- Max 300 lines per file
- Max 120 lines per function
- Max complexity of 12
- Max 4 function parameters
- Explicit return types on all functions
- Arrow function components only
- Strict boolean expressions
- No `any` types (warning)
- Custom rules for folder structure and feature boundaries

### Styling System

Uses react-native-unistyles with a custom theme system:

- Theme tokens defined in src/themes/tokens/
- Configured in src/themes/unistyles.ts with adaptive themes enabled
- Never use inline styles (ESLint warning)
- Never use color literals (ESLint warning)
- Use StyleSheet.create with theme callback for accessing theme tokens

### Testing Strategy

- Jest configured with jest-expo preset
- Test setup in .jest/jest-init.js
- MSW for API mocking (currently commented out but configured)
- Transform ignores for React Native, Expo, and MSW packages

### TypeScript Configuration

- Strict mode enabled
- Base URL set to `./` with path alias `@/*` for src imports
- Module resolution: bundler
- Includes: src, index.tsx, config files, .storybook

## Module Development

When adding new Modules:

1. Create a new folder under src/modules/ with the structure:
   - **api/** - Module-specific API endpoints (queries and mutations)
   - **hooks/** - Module-specific React hooks
   - **screens/** - Module screen components
   - **store/** - Module state management (if needed)
   - **types.ts** or **routes.types.ts** - Module-specific TypeScript types
   - **screenConfig.ts** - Module navigation stack and routes configuration
   - **index.ts** - Module configuration export for app registry
   - **DOCS.md** - Module documentation (enforced by ESLint)
2. Modules must only import from src/shared/ and src/store/
3. Each module exports a configuration object that plugs into the ModuleRegistry
4. Follow the existing pattern in the auth/ module
5. Screens from src/modules/old/ should be migrated to proper feature modules following this structure

## Documentation

See the handbook/ directory for detailed documentation:

- project_overview.md - Vision and problem statement
- product_spec.md - Core features and technical requirements
- folder_structure.md - Detailed folder organization
- research_notes.md - Research and decision logs

### Automated Documentation Updates

The project includes a GitHub workflow (`.github/workflows/auto-update-docs.yml`) that automatically reviews and updates documentation when PRs are merged. This workflow:

- Triggers on PR merge to main/master branch
- Uses Claude Code AI to analyze changed files
- Updates JSDoc comments and markdown documentation
- Creates a documentation PR for human review

See `.github/workflows/README.md` for setup instructions and workflow details. The automation ensures documentation stays synchronized with code changes while maintaining quality through PR review.
