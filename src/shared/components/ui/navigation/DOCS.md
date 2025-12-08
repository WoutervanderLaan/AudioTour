# Navigation UI Components

This folder contains blur-enhanced navigation components for creating glassmorphism effects in the app's navigation elements.

## Components

### BlurTabBar

A custom bottom tab bar component with blur effect for a modern glassmorphism design.

**Features:**
- Uses expo-blur's BlurView as background
- Platform-adaptive tinting (light/dark)
- Configurable blur intensity
- Transparent background with subtle border

**Usage:**
```tsx
import {BlurTabBar} from '@/shared/components/ui/navigation/BlurTabBar'

<Tab.Navigator
  tabBar={props => <BlurTabBar {...props} intensity={80} />}
>
  {/* screens */}
</Tab.Navigator>
```

**Integration:**
Already integrated in `src/core/navigation/RootNavigator.tsx`.

### BlurHeader

A custom header component with blur effect for screen headers.

**Features:**
- Blurred background with glassmorphism effect
- Back button support
- Custom title rendering
- Right action button support
- Platform-adaptive tinting

**Usage:**
```tsx
import {getBlurHeaderOptions} from '@/shared/hooks/useNavigationTheme'

<Stack.Screen
  name="MyScreen"
  component={MyScreen}
  options={getBlurHeaderOptions(80)}
/>
```

Or use directly:
```tsx
import {BlurHeader} from '@/shared/components/ui/navigation/BlurHeader'

<Stack.Screen
  name="MyScreen"
  component={MyScreen}
  options={{
    headerShown: true,
    headerTransparent: true,
    header: props => <BlurHeader {...props} intensity={90} />
  }}
/>
```

## Related Components

- **BlurBox** (`@/shared/components/ui/layout/BlurBox`): General-purpose blur container that these components are built upon
- See `BlurNavigation.stories.tsx` for usage examples and documentation

## Implementation Notes

- All components use `expo-blur` for the blur effect
- Tint adapts to theme (light/dark) automatically
- Default blur intensity is 80 (0-100 scale)
- Components follow the existing Box component pattern for consistency
