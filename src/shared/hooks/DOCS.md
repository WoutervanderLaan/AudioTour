# src/shared/hooks

Shared custom React hooks that are generic and reusable across the application.

## Hooks

### useBanner.ts

Hook for accessing the banner notification system.

**Purpose**: Provides access to sticky banner notifications that appear at the top of the screen.

**Returns**: Banner context with methods to show and hide banner notifications.

**Usage**:

```typescript
const {showBanner, hideBanner} = useBanner()
showBanner({message: 'Success!', type: 'success'})
```

**Location**: `src/shared/hooks/useBanner.ts`

### useToast.ts

Hook for accessing the toast notification system.

**Purpose**: Provides access to temporary toast messages that appear briefly to provide feedback.

**Returns**: Toast context with methods to show and hide toast notifications.

**Usage**:

```typescript
const {showToast} = useToast()
showToast({message: 'Item saved', type: 'success'})
```

**Location**: `src/shared/hooks/useToast.ts`

### useNavigation.ts

Type-safe wrapper around React Navigation's useNavigation hook.

**Purpose**: Provides navigation methods with full TypeScript support for the app's root navigation stack.

**Returns**: Navigation prop with type-safe methods for navigating between screens.

**Usage**:

```typescript
const {navigate, goBack} = useNavigation()
navigate('TourFeed', {sessionId: '123'})
```

**Location**: `src/shared/hooks/useNavigation.ts`

### useKeyboard.ts

Hook for accessing keyboard state and dimensions.

**Purpose**: Provides keyboard visibility, height, and animated height values for responsive layouts.

**Returns**:

- `isKeyboardVisible`: Boolean indicating if keyboard is visible
- `keyboardHeight`: Static keyboard height in pixels
- `animatedKeyboardHeight`: Animated value for smooth transitions

**Usage**:

```typescript
const {isKeyboardVisible, keyboardHeight, animatedKeyboardHeight} =
  useKeyboard()
```

**Location**: `src/shared/hooks/useKeyboard.ts`

### useBottomTabBarHeight.ts

Hook for retrieving the bottom tab bar height.

**Purpose**: Gets the current height of the bottom tab bar from React Navigation. Returns 0 if not within a tab navigator.

**Returns**: The height of the bottom tab bar in pixels, or 0 if unavailable.

**Usage**:

```typescript
const tabBarHeight = useBottomTabBarHeight()
```

**Location**: `src/shared/hooks/useBottomTabBarHeight.ts`

### useNavigationInsets.ts

Hook for calculating navigation-related insets (header and tab bar heights).

**Purpose**: Provides header height, tab bar height, and total insets for responsive layouts that need to account for navigation elements.

**Parameters**:

- `insets`: Optional array specifying which elements to include (`['header']`, `['tab']`, or `['header', 'tab']`)

**Returns**:

- `headerHeight`: Height of the header including safe area
- `tabBarHeight`: Height of the bottom tab bar
- `top`: Total top inset
- `bottom`: Total bottom inset

**Usage**:

```typescript
const {headerHeight, tabBarHeight, top, bottom} = useNavigationInsets([
  'header',
  'tab',
])
```

**Location**: `src/shared/hooks/useNavigationInsets.ts`

### useNavigationTheme.ts

Hook for accessing navigation theme configuration.

**Purpose**: Provides theme-aware navigation options for headers, tab bars, and screen options.

**Returns**:

- `theme`: Object with header and tabBar color/style configuration
- `defaultHeaderOptions`: Default header options for stack navigators
- `defaultTabBarOptions`: Default tab bar options for tab navigators

**Usage**:

```typescript
const {theme, defaultHeaderOptions, defaultTabBarOptions} = useNavigationTheme()
```

**Location**: `src/shared/hooks/useNavigationTheme.ts`

### useUserLocation.ts

Hook for accessing user's current geographic location.

**Purpose**: Requests location permissions and retrieves the user's current coordinates.

**Returns**:

- `coords`: Coordinates object with latitude and longitude, or undefined if unavailable
- `permissionStatus`: Current permission status ('granted', 'denied', or 'undetermined')
- `error`: Error message if location access failed, or undefined

**Usage**:

```typescript
const {coords, permissionStatus, error} = useUserLocation()
```

**Location**: `src/shared/hooks/useUserLocation.ts`

### useFonts.ts

Hook for loading custom fonts used in the application.

**Purpose**: Loads Google Fonts (Lora and Playfair Display families) asynchronously.

**Returns**:

- `fontsLoaded`: Boolean indicating if all fonts have loaded successfully
- `fontLoadError`: Error object if font loading failed

**Usage**:

```typescript
const {fontsLoaded, fontLoadError} = useFonts()
```

**Location**: `src/shared/hooks/useFonts.ts`

## Guidelines

These hooks should be:

- Generic and reusable across multiple features
- Not tied to specific business logic
- Well-documented with clear purpose and usage examples
- Type-safe with proper TypeScript definitions
