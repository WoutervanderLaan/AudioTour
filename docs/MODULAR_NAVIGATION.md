# Modular Navigation System

This document explains how the modular navigation system works and how to add new routes to your modules.

## Overview

The navigation system now follows a **modular architecture** where each module defines its own routes, including:
- Route name
- Route type (`tab`, `stack`, or `modal`)
- Route parameters (TypeScript types)
- Screen component
- Navigation options
- Deep linking configuration

The central navigation system (`RootNavigator` and `TabNavigator`) automatically gathers these routes from all modules and builds the navigation structure dynamically.

## Important Limitations

### Static Module Loading

**All modules must be registered before the app initializes.** The navigation system is designed for static module loading, not dynamic runtime module registration.

- **Type Generation**: Navigation types (`RootStackParamList`, `HomeTabsParamList`) are generated at compile time from statically imported module routes.
- **Linking Configuration**: Deep linking paths are built once when the `linking.ts` module loads, before app initialization.
- **Tab Navigator**: Tab routes are gathered once when the `TabNavigator` component mounts and cached for its lifetime.

**What this means:**
- You cannot add or remove modules after the app starts
- You cannot conditionally load modules based on runtime conditions (user roles, feature flags, etc.)
- All module route imports in `src/core/navigation/types.ts` must be static

**Why this design?**
- Ensures compile-time type safety for navigation
- Prevents runtime errors from missing routes
- Improves performance (no runtime route resolution)
- Keeps the architecture simple and predictable

If you need feature flags or conditional routes, implement them at the **screen level**, not the module level.

## Architecture

### Key Components

1. **`ModuleRoute`** (`src/shared/types/module.ts`)
   - Type definition for module routes
   - Includes `type`, `params`, `screen`, `options`, and `linking` properties

2. **`ModuleRegistry`** (`src/core/navigation/ModuleRegistry.ts`)
   - Manages module registration and lifecycle
   - Provides methods to get routes by type: `getTabRoutes()`, `getStackRoutes()`, `getModalRoutes()`, `getRootStackRoutes()`

3. **`TabNavigator`** (`src/core/navigation/TabNavigator.tsx`)
   - Dynamic bottom tab navigator
   - Automatically renders all routes with `type: 'tab'` from all modules

4. **`RootNavigator`** (`src/core/navigation/RootNavigator.tsx`)
   - Root stack navigator
   - Renders the `TabNavigator` as `HomeTabs`
   - Automatically registers all routes with `type: 'stack'` or `type: 'modal'`

5. **Navigation Type Generation** (`src/core/navigation/types.ts`)
   - `RootStackParamList` and `HomeTabsParamList` are dynamically generated from module routes
   - Uses `ExtractParamList` utility type to build param lists from route definitions

## Route Types

### `tab`
- Rendered in the bottom tab navigator
- Appears at the bottom of the screen with a tab bar
- Example: Home, Profile, Settings tabs

### `stack`
- Rendered as a regular screen in the root stack navigator
- Can be navigated to from any screen
- Example: Detail screens, list screens

### `modal`
- Rendered as a modal in the root stack navigator
- Slides up from bottom on iOS, fades in on Android
- Automatically gets a close button
- Example: Settings, Create forms

## Adding Routes to a Module

### Step 1: Define Your Routes

Create or update `src/modules/{your-module}/navigation/routes.ts`:

**IMPORTANT:** Export routes pre-filtered by type (`tabRoutes`, `stackRoutes`, `modalRoutes`) for proper compile-time type inference.

```typescript
import {MyScreen, MyDetailScreen, MyModalScreen} from '../screens'
import {ModuleRoute} from '@/shared/types/module'

/**
 * Tab routes for MyModule
 */
export const tabRoutes = [
  {
    name: 'MyTab',
    type: 'tab' as const, // Important: 'as const' for type narrowing
    params: undefined,
    screen: MyScreen,
    options: {
      title: 'My Tab',
    },
  },
] as const satisfies readonly ModuleRoute[]

/**
 * Stack routes for MyModule
 */
export const stackRoutes = [
  {
    name: 'MyDetail',
    type: 'stack' as const,
    params: {id: '' as string}, // Type assertion for required params
    screen: MyDetailScreen,
    options: {
      title: 'Detail',
    },
    linking: {
      path: 'my-detail/:id',
    },
  },
] as const satisfies readonly ModuleRoute[]

/**
 * Modal routes for MyModule
 */
export const modalRoutes = [
  {
    name: 'MyModal',
    type: 'modal' as const,
    params: undefined,
    screen: MyModalScreen,
    options: {
      title: 'My Modal',
      presentation: 'modal',
    },
    linking: {
      path: 'my-modal',
    },
  },
] as const satisfies readonly ModuleRoute[]

/**
 * All routes combined (for module config)
 */
export const routes = [...tabRoutes, ...stackRoutes, ...modalRoutes] as const
```

### Step 2: Update Your Module Config

Update `src/modules/{your-module}/module.config.ts`:

```typescript
import {routes} from './navigation/routes'
import {ModuleConfig} from '@/shared/types/module'

export const myModuleConfig: ModuleConfig = {
  name: 'my-module',
  version: '1.0.0',
  enabled: true,

  routes, // Add your routes here

  // ... other config
}
```

### Step 3: Register Routes in Navigation Types

Update `src/core/navigation/types.ts` to include your module routes:

**IMPORTANT:** Import the pre-filtered route arrays (`tabRoutes`, `stackRoutes`, `modalRoutes`), NOT the combined `routes` array.

```typescript
import {
  tabRoutes as myModuleTabRoutes,
  stackRoutes as myModuleStackRoutes,
  modalRoutes as myModuleModalRoutes,
} from '@/modules/my-module/navigation/routes'

// Add to the appropriate route arrays
const allTabRoutes = [
  ...authTabRoutes,
  ...oldTabRoutes,
  ...myModuleTabRoutes, // Add here
] as const

const allRootStackRoutes = [
  ...authStackRoutes,
  ...authModalRoutes,
  ...oldStackRoutes,
  ...oldModalRoutes,
  ...myModuleStackRoutes, // Add here
  ...myModuleModalRoutes, // Add here
] as const
```

That's it! The navigation system will automatically:
- Add tab routes to the bottom tab navigator
- Register stack/modal routes in the root stack
- Generate TypeScript types for type-safe navigation
- Configure deep linking

## Route Parameters

### No Parameters
For routes without parameters, use `undefined`:

```typescript
{
  name: 'Home',
  type: 'tab',
  params: undefined,
  // ...
}
```

### With Parameters
For routes with parameters, define the shape:

```typescript
{
  name: 'UserProfile',
  type: 'stack',
  params: {
    userId: '' as string,
    tab?: 'posts' | 'followers' | 'following', // Optional parameter
  },
  // ...
}
```

The `params` object defines the TypeScript type for the route parameters. Use type assertions (e.g., `'' as string`) for required parameters.

## Navigation Usage

### Navigating to Routes

```typescript
import {useNavigation} from '@react-navigation/native'
import type {RootStackScreenProps} from '@/core/navigation'

// In your component
const navigation = useNavigation()

// Navigate to a tab
navigation.navigate('MyTab')

// Navigate with parameters
navigation.navigate('MyDetail', {id: '123'})

// Navigate to a modal
navigation.navigate('MyModal')
```

### Accessing Route Parameters

```typescript
import type {RootStackScreenProps} from '@/core/navigation'

type Props = RootStackScreenProps<'MyDetail'>

export const MyDetailScreen: React.FC<Props> = ({route}) => {
  const {id} = route.params // Type-safe!
  // ...
}
```

## Benefits

1. **Modular**: Each module owns its routes
2. **Type-Safe**: TypeScript types are automatically generated from route definitions
3. **Centralized**: No need to modify central navigation files when adding routes
4. **Scalable**: Easy to add, remove, or reorganize routes
5. **Self-Documenting**: Route configuration includes all metadata in one place

## Migration from Old System

### Before
```typescript
// routes.ts
export const tabs: ModuleRoute[] = [...]
export const stackScreens: ModuleRoute[] = [...]

// module.config.ts
navigator: Tabs,
routes: stackScreens,
```

### After
```typescript
// routes.ts
export const routes = [
  {name: 'Home', type: 'tab', params: undefined, ...},
  {name: 'Detail', type: 'stack', params: {id: '' as string}, ...},
] as const satisfies readonly ModuleRoute[]

// module.config.ts
routes,
```

## Examples

See the following modules for examples:
- **Auth Module**: `src/modules/auth/navigation/routes.ts` - Stack routes
- **Old Module**: `src/modules/old/navigation/routes.ts` - Tab, stack, and modal routes
