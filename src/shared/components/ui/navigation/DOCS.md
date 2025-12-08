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

## Related Components

- **BlurBox** (`@/shared/components/ui/layout/BlurBox`): General-purpose blur container that these components are built upon
- See `BlurNavigation.stories.tsx` for usage examples and documentation

## Implementation Notes

- All components use `expo-blur` for the blur effect
- Tint adapts to theme (light/dark) automatically
- Default blur intensity is 80 (0-100 scale)
- Components follow the existing Box component pattern for consistency

## Performance Considerations

**Blur effects can be performance-intensive, especially on lower-end devices:**

- **Intensity**: Higher blur intensities (80-100) are more expensive. Consider using lower values (50-70) on Android or older devices
- **Number of blur views**: Avoid nesting multiple BlurView components or having too many on screen at once
- **Animation**: Animating blur intensity can cause performance issues. If you need to animate blur, test thoroughly on target devices
- **Testing**: Always test blur components on lower-end Android devices to ensure acceptable performance

**Optimization tips:**

- Use blur sparingly - reserve for key UI elements like navigation bars
- Consider reducing `blurReductionFactor` on Android to match iOS appearance with less performance cost
- For heavily animated screens, consider using semi-transparent backgrounds instead of blur
