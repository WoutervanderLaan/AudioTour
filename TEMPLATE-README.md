# React Native Expo Template

A production-ready React Native template with Expo, featuring comprehensive tooling, strict code quality enforcement, and best practices for scalable app development.

## 🌟 What's Included

### Core Stack

- **React Native 0.81** with **Expo 54**
- **React 19** with latest ecosystem
- **TypeScript** with strict mode
- **React Navigation 7** (bottom tabs + native stack)
- **Zustand** for state management
- **TanStack Query v5** for data fetching
- **react-native-unistyles v3** for theming
- **react-hook-form** + **Zod** for forms

### Development Tools

- ✅ **ESLint** with custom rules for architecture enforcement
- ✅ **Prettier** for code formatting
- ✅ **Husky** pre-commit hooks (tests, typecheck, format, lint)
- ✅ **Jest** with jest-expo preset
- ✅ **Storybook** for component development
- ✅ **MSW v2** for API mocking

### Architecture Features

- 🏗️ **Feature-based architecture** with ESLint boundary enforcement
- 📁 **Strict folder structure** (app, features, shared, store, themes)
- 📝 **Documentation enforcement** (DOCS.md required in features)
- 🎨 **Theme system** with tokens (color, spacing, typography)
- 🔧 **Custom ESLint rules** for code quality

### GitHub Integration

- 🤖 **AI Agent workflow** for automated task completion
- 🔍 **Automated code review** on pull requests
- 💬 **Interactive Claude assistant** via GitHub comments
- 🔗 **Trello integration** for task management (optional)

## 🚀 Quick Start

### 1. Use This Template

Click "Use this template" on GitHub or clone the repository:

```bash
git clone <your-template-repo-url> my-new-app
cd my-new-app
```

### 2. Initialize Your Project

Run the initialization script to configure your project:

```bash
npm install
node scripts/init-template.js
```

The script will prompt you for:
- Project name
- Bundle ID (iOS) and package name (Android)
- Apple Team ID (optional)
- EAS Project ID (optional)
- URL scheme

### 3. Set Up Environment

Copy the example environment file and configure:

```bash
cp .env.example .env
```

Edit `.env` with your API endpoints and configuration.

### 4. Install Dependencies

```bash
npm install
npm run prepare  # Set up Husky hooks
```

### 5. Start Developing

```bash
npm start        # Start Expo dev server
npm run ios      # Run on iOS
npm run android  # Run on Android
npm run web      # Run on web
```

## 📋 Available Scripts

### Development

- `npm start` - Start Expo dev server
- `npm run start:reset:cache` - Start with cleared cache
- `npm run ios` - Run on iOS device/simulator
- `npm run android` - Run on Android device/emulator
- `npm run web` - Run web version

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix linting issues
- `npm run typecheck` - Run TypeScript compiler check
- `npm run format` - Check code formatting
- `npm run format:fix` - Auto-fix formatting
- `npm run validate` - Run all checks (lint, typecheck, format)
- `npm test` - Run Jest tests

### Storybook

- `npm run storybook` - Start Storybook on port 6006
- `npm run storybook-generate` - Generate Storybook stories list
- `npm run build-storybook` - Build static Storybook

Toggle between app and Storybook using the Expo dev menu: "Toggle Storybook"

### Cleanup

- `npm run clean` - Clean React Native project artifacts

## 📂 Project Structure

```
├── .github/
│   └── workflows/        # GitHub Actions workflows
├── .husky/               # Git hooks
├── .storybook/           # Storybook configuration
├── eslint-rules/         # Custom ESLint rules
├── handbook/             # Project documentation
├── scripts/              # Utility scripts
└── src/
    ├── app/              # App-wide setup (providers, navigation)
    ├── features/         # Self-contained feature modules
    │   ├── auth/        # Example: Authentication
    │   ├── capture/     # Example: Photo capture
    │   └── user/        # Example: User management
    ├── shared/          # Reusable components and utilities
    │   ├── components/
    │   │   ├── ui/     # Generic UI components
    │   │   └── features/ # Complex reusable features
    │   ├── hooks/      # Custom hooks
    │   ├── lib/        # API clients, helpers
    │   └── types/      # Global TypeScript types
    ├── store/          # Global state management
    │   ├── context/    # React Context providers
    │   ├── slices/     # Zustand store slices
    │   └── middleware/ # Store middleware
    └── themes/         # Theme configuration and tokens
```

## 🏗️ Architecture Rules

The template enforces a strict feature-based architecture via ESLint:

### Import Boundaries

- **app/** can import from: `shared`, `features`, `store`, `themes`
- **features/** can import from: `shared`, `store` only
- **shared/** can import from: `themes` only
- **store/** can import from: `shared` only

### Import Rules

- ✅ Use absolute imports with `@/*` alias
- ❌ Never use `../` parent imports
- ✅ Use `StyleSheet` from `react-native-unistyles`
- ❌ Never use `StyleSheet` from `react-native`

### Code Quality Rules

- Max 300 lines per file
- Max 120 lines per function
- Max complexity: 12
- Max 4 function parameters
- Explicit return types required
- Arrow function components only
- No inline styles (ESLint warning)
- No color literals (ESLint warning)

## 🎨 Styling System

Uses **react-native-unistyles** with a custom theme system:

```typescript
import {createStyleSheet, useStyles} from 'react-native-unistyles'

export const Component = () => {
  const {styles} = useStyles(stylesheet)

  return <View style={styles.container} />
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
}))
```

Theme tokens are in `src/themes/tokens/`:
- `color.ts` - Color palette
- `spacing.ts` - Spacing scale
- `typography.ts` - Font sizes and weights

## 🧪 Testing

Jest is configured with:
- `jest-expo` preset
- Setup file: `.jest/jest-init.js`
- MSW for API mocking (optional)

Run tests:
```bash
npm test              # Watch mode
npm test -- --coverage # With coverage
```

## 🤖 GitHub Workflows

### AI Agent Workflow (`ai-agent.yml`)

Automates task completion with Claude Code:
- Triggered manually with Trello card details
- Creates feature branches
- Runs Claude Code agent
- Validates changes
- Creates pull requests
- Updates Trello (optional)

### Code Review Workflow (`claude-code-review.yml`)

Automated PR review:
- Runs on PR open/update
- Analyzes code against project guidelines
- Posts review comments

### Interactive Assistant (`claude.yml`)

Comment-based assistance:
- Mention `@claude` in issues or PRs
- Get code inspection and suggestions
- Read-only, no automatic changes

## 🔧 Build Variants

The template supports three build variants via `APP_VARIANT` environment variable:

- **development** - Bundle ID: `com.yourcompany.app.dev`
- **preview** - Bundle ID: `com.yourcompany.app.preview`
- **production** - Bundle ID: `com.yourcompany.app`

Configure in `app.config.js` and `eas.json`.

## 📝 Creating Features

To add a new feature:

1. Create folder under `src/features/`:
```bash
mkdir -p src/features/my-feature/{components,hooks,services,types}
```

2. Add required structure:
   - `components/` - Feature-specific UI
   - `hooks/` - Feature-specific hooks
   - `services/` - Business logic
   - `types/` - TypeScript types
   - `index.ts` - Public API exports
   - `DOCS.md` - Feature documentation (required by ESLint)

3. Follow import rules:
   - Only import from `@/shared` and `@/store`
   - Export public API through `index.ts`

Example `DOCS.md`:
```markdown
# My Feature

## Purpose
Brief description of what this feature does.

## Components
- ComponentName - What it does

## Hooks
- useMyHook - What it does

## Services
- myService - What it does
```

## 🔐 Pre-commit Hooks

Husky runs these checks before each commit:

1. ✅ Jest tests (must pass)
2. ✅ TypeScript typecheck (must pass)
3. ✅ Prettier format check (must pass)
4. ✅ lint-staged (ESLint + Prettier on changed files)

Bypass hooks (not recommended):
```bash
git commit --no-verify
```

## 🌐 Environment Variables

Create `.env` file with:

```bash
# API Configuration
EXPO_PUBLIC_API_BASE_URL=http://localhost:8000

# Build Variant
APP_VARIANT=development

# Add your environment variables here
```

## 📱 EAS Build & Deployment

Configure Expo Application Services:

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Log in:
```bash
eas login
```

3. Configure project:
```bash
eas build:configure
```

4. Build:
```bash
eas build --platform ios --profile development
eas build --platform android --profile development
```

See [EAS documentation](https://docs.expo.dev/build/introduction/) for more.

## 🎓 Learning Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [TanStack Query](https://tanstack.com/query/latest)
- [react-native-unistyles](https://reactnativeunistyles.vercel.app/)

## 🤝 Claude Code Integration

This template is optimized for use with **Claude Code** (claude.ai/code). See `CLAUDE.md` for detailed guidelines on:
- Project architecture
- Development commands
- Code quality standards
- Feature development patterns

The GitHub workflows enable:
- Automated task completion via AI agent
- Code review on pull requests
- Interactive assistance via comments

## 📄 License

[Your License Here]

## 🙏 Credits

Built with:
- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- And many other amazing open-source projects
