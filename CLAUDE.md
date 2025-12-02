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
├── shared/           # Reusable, generic components and utilities
│   ├── components/
│   │   ├── ui/      # Generic UI components
│   │   └── features/ # Complex reusable features
│   ├── context/     # React Context providers
│   ├── hooks/       # Shared custom hooks
│   ├── lib/         # API clients, helpers, utilities, constants
│   └── types/       # Global TypeScript types
├── modules/        # Self-contained feature modules
│   ├── auth/        # Authentication module
│   ├── user/        # User management module
│   └── capture/     # Photo capture module
├── store/           # Global Zustand state management
│
│   └── middleware/  # Store middleware
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

The app uses a custom `ApiClient` class (src/shared/lib/api/client.ts) that handles:

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

Static navigation configuration with TypeScript safety:

- **Root Stack**: ObjectDetail, Narrative, Settings (modal), NotFound
- **Home Tabs**: Capture, Museum, Recommendations
- Deep linking configured in src/app/navigation/linking.ts

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

<!-- ## Module Development

When adding new Modules:

1. Create a new folder under src/modules/ with the structure:
   - components/ (feature-specific UI)
   - hooks/ (feature-specific hooks)
   - services/ (feature-specific business logic)
   - types/ (feature-specific types)
   - index.ts (public API exports)
2. Features must only import from src/shared/ and src/store/
3. Add a DOCS.md file explaining the feature (enforced by ESLint)
4. Follow the existing patterns in auth/ and user/ modules --> TODO: deprecated, needs update

## Documentation

See the handbook/ directory for detailed documentation:

- project_overview.md - Vision and problem statement
- product_spec.md - Core features and technical requirements
- folder_structure.md - Detailed folder organization
- research_notes.md - Research and decision logs
