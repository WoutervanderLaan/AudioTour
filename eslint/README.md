# ESLint Configuration

This directory contains a modularized ESLint configuration for better maintainability and organization.

## Structure

```
eslint/
├── README.md                          # This file
├── index.js                           # Re-exports all configuration modules
├── paths.config.js                    # Shared path constants for consistent resolution
├── base.config.js                     # Base language options and parser config
├── main.config.js                     # Main config that combines everything
├── plugins.config.js                  # All ESLint plugins configuration
├── settings.config.js                 # ESLint settings (React, import resolver, boundaries)
├── rules/                             # Rule configurations organized by category
│   ├── index.js                       # Combines all rules
│   ├── react.rules.js                 # React and React Hooks rules
│   ├── react-native.rules.js          # React Native specific rules
│   ├── typescript.rules.js            # TypeScript rules
│   ├── general.rules.js               # General JavaScript/TypeScript rules
│   ├── code-quality.rules.js          # Code quality rules (max-lines, complexity, etc.)
│   ├── documentation.rules.js         # Documentation rules (custom local rules)
│   ├── imports.rules.js               # Import sorting and unused imports rules
│   ├── architectural.rules.js         # Architectural conventions and import restrictions
│   ├── folder-structure.rules.js      # Folder structure and boundaries rules
│   └── misc.rules.js                  # Miscellaneous rules (promise, security, sonarjs, unicorn)
└── overrides/                         # Configuration overrides for specific file types
    ├── index.js                       # Re-exports all overrides
    ├── config-files.override.js       # Override for config files and eslint-rules
    ├── storybook.override.js          # Override for Storybook files
    └── tests.override.js              # Override for test files
```

## How It Works

1. **Root Configuration** (`eslint.config.js`): The main entry point imports base configs from `@eslint/js` and `eslint-plugin-storybook`, then composes the configuration using modules from this directory.

2. **Path Resolution** (`paths.config.js`): Exports `PROJECT_ROOT` constant using Node's `path.resolve()` to ensure consistent absolute path resolution across all config files, avoiding fragile relative path strings.

3. **Main Config** (`main.config.js`): Combines base language options, plugins, settings, and all rules for the main source files.

4. **Rule Organization**: Rules are organized by category in the `rules/` directory for easy maintenance and updates.

5. **Overrides**: Special configurations for different file types (tests, storybook stories, config files) are in the `overrides/` directory.

## Adding New Rules

To add new rules:

1. Locate the appropriate rules file in `rules/` directory (e.g., `react.rules.js` for React rules)
2. Add your rule to the returned object
3. The rule will automatically be included in the main configuration

Example:

```javascript
// In rules/react.rules.js
export const reactRules = () => ({
  'react/react-in-jsx-scope': 'off',
  'react/prop-types': 'off',
  // Add new rule here
  'react/jsx-key': 'error',
})
```

## Creating New Rule Categories

To create a new rule category:

1. Create a new file in `rules/` (e.g., `custom.rules.js`)
2. Export a function that returns your rules object
3. Import and include it in `rules/index.js`

Example:

```javascript
// In rules/custom.rules.js
export const customRules = () => ({
  'my-custom-rule': 'error',
})

// In rules/index.js
import {customRules} from './custom.rules.js'

export const createAllRules = () => ({
  ...reactRules(),
  ...customRules(), // Add here
  // ... other rules
})
```

## Path Resolution Pattern

The configuration uses a centralized `paths.config.js` file to export absolute path constants. This avoids fragile relative path strings like `import.meta.dirname + '/..'`.

**Why?** Different config files at different directory depths would need different relative paths (`..` vs `../..`), making the configuration error-prone and hard to maintain.

**Solution:** Import `PROJECT_ROOT` from `paths.config.js` in any config file that needs path resolution:

```javascript
import {PROJECT_ROOT} from './paths.config.js'

export const myConfig = () => ({
  parserOptions: {
    tsconfigRootDir: PROJECT_ROOT, // Always resolves to project root
  },
})
```

## Benefits of This Structure

- **Maintainability**: Rules are organized by category, making them easy to find and update
- **Modularity**: Each configuration aspect is in its own file
- **Clarity**: The purpose of each rule set is immediately clear from the file name
- **Scalability**: Easy to add new rule categories or override configurations
- **Robust Path Resolution**: Centralized absolute paths prevent path resolution errors
- **Documentation**: JSDoc comments on all configuration functions
