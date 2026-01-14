# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An AI-powered React Native app that generates dynamic audio tours based on museum objects photographed by users. The app combines object recognition, contextual narrative generation, and personalized story sequences to offer engaging and interactive museum experiences.

### Core Principles

The codebase must remain:

- **Clean**: Well-organized with clear separation of concerns
- **Modular**: Self-contained features with minimal coupling
- **Explainable**: Comprehensive documentation and clear code
- **Well-tested**: Thorough test coverage for core functionality

For detailed project documentation, consult the [README](./README.md) and the [project handbook](./handbook).

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
│   ├── community/   # Community tours browsing and discovery module
│   ├── history/     # Tour history and persistence module
│   ├── onboarding/  # User onboarding module
│   ├── notifications/  # Push notification module
│   ├── profile/     # User profile module
│   └── tour/        # Tour and artwork management module
├── store/            # Global Zustand state management
│   └── slices/      # Store slices
└── themes/          # Theme configuration and tokens
    └── tokens/      # Individual theme tokens
```

For detailed folder structure documentation, consult the handbook: [Folder Structure](./handbook/folder_structure.md)

### Import Rules (Enforced by ESLint)

- **app/** can import from: shared, modules, store, themes
- **core/** can import from: shared only
- **modules/** can import from: shared, store only
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

### Styling System

Uses react-native-unistyles with a custom theme system:

- Theme tokens defined in src/themes/tokens/
- Configured in src/themes/unistyles.ts with adaptive themes enabled
- Never use inline styles (ESLint warning)
- Never use color literals (ESLint warning)
- Use StyleSheet.create with theme callback for accessing theme tokens

### TypeScript Configuration

- Strict mode enabled
- Base URL set to `./` with path alias `@/*` for src imports
- Module resolution: bundler
- Includes: src, index.tsx, config files

## Code Quality Standards

### JSDoc Documentation (Enforced)

Every function, class, hook, and utility **must have complete JSDoc documentation**.

All JSDoc comments must include:

- Clear description of purpose
- `@param` for each parameter with type and description
- `@returns` with return type and description
- Edge cases and important behavior notes where applicable

### Folder Documentation (Enforced)

Every folder **must include a DOCS.md file** documenting:

- The folder's purpose and responsibilities
- Key files and their roles
- Usage guidelines and patterns

This requirement is enforced by ESLint and applies to all modules and feature directories.

### ESLint Rules (Strictly Enforced)

The project has strict ESLint rules that **must pass without suppression**:

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
- Boundaries rules for module isolation
- Unused imports enforcement
- Consistent type usage

**Always run `npm run lint:fix` before finalizing code.** Do not use ESLint suppressions or disable rules.

### Pre-commit Validation (Husky)

Pre-commit hooks validate:

- Code formatting (Prettier)
- Lint rules (ESLint)
- Type checking (TypeScript)

All code must pass these checks before committing. If hooks fail, fix the issues before proceeding.

## Testing Requirements

**CRITICAL**: For any added or modified functionality, you **must** create or update tests.

### When to Write Tests

Tests are **required** for:

- **Utility functions** - All functions in `src/shared/utils/` and `src/core/lib/`
- **Custom hooks** - All hooks in `src/shared/hooks/` and module-specific hooks
- **Services** - API clients, authentication services, data transformations
- **Core functionality** - State management, navigation logic, business logic
- **Components with logic** - Components with conditional rendering, state management, or complex interactions

### Testing Guidelines

- Match existing test patterns in the codebase
- Use Jest with jest-expo preset
- Mock external dependencies appropriately
- Test edge cases and error handling
- Ensure tests are deterministic and don't rely on external state
- If tests fail, **iterate until the suite passes** - do not commit failing tests

### Running Tests

```bash
npm test              # Run tests in watch mode
```

## Code Style Guidelines

Follow these principles when writing code:

- **Functional patterns**: Prefer functional, composable patterns over imperative code
- **Small functions**: Keep functions focused and modular (max 120 lines)
- **Avoid side effects**: Pure functions where possible
- **Strong typing**: Leverage TypeScript for type safety
- **No unused exports**: Remove unused code and imports
- **Clear naming**: Use descriptive, self-documenting names
- **Clean components**: Keep React components simple and focused

## Module Development

When adding new Modules:

1. Create a new folder under src/modules/ with the structure:
   - **api/** - Module-specific API endpoints (queries and mutations)
   - **components/** - Module-specific components (optional)
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

## Git Workflow

### Commit Style

Use **conventional commits** format:

- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring without behavior change
- `docs:` - Documentation updates
- `test:` - Test additions or modifications
- `chore:` - Internal updates, dependency updates, tooling

Examples:

```
feat: add audio playback controls to tour screen
fix: resolve crash when loading artwork without metadata
refactor: simplify navigation module registry
docs: update testing requirements in CLAUDE.md
test: add unit tests for artwork utilities
```

### Pull Requests

When creating a pull request, ensure it includes:

- **Clear title** using conventional commit format
- **Description** explaining what changed and why
- **List of files** added or modified
- **Testing notes** describing how the changes were tested
- **Breaking changes** noted if applicable

## Agent Workflow

When assigned a task, follow this workflow:

1. **Analyze** the repository and understand existing patterns
2. **Search** for relevant files using Glob/Grep tools
3. **Read** relevant code to understand context
4. **Plan** the implementation approach
5. **Implement** changes following all code quality standards
6. **Write or update tests** for modified functionality
7. **Run validation** - lint, typecheck, and tests must pass
8. **Commit** changes in logical chunks with clear messages
9. **Create PR** with comprehensive description
10. **Stop** after PR creation - do not merge

If requirements are unclear, infer the intent based on existing codebase patterns and architecture.

## Do Not

The following practices are **strictly prohibited**:

- ❌ Do not disable linting rules or use ESLint suppressions
- ❌ Do not skip tests for new functionality
- ❌ Do not create undocumented folders (missing DOCS.md)
- ❌ Do not leave TODO comments without explanation
- ❌ Do not introduce breaking changes without migration notes
- ❌ Do not use inline styles or color literals
- ❌ Do not use parent imports (`../`) - use absolute imports
- ❌ Do not use `any` type unless absolutely necessary
- ❌ Do not commit code that fails lint, typecheck, or tests

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
