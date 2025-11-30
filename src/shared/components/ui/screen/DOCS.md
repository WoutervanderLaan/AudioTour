# Screen Component

## Overview

The `Screen` component is a flexible wrapper for all screen content in the application. It provides three variants to handle different layout needs: a basic container, a static non-scrollable screen, and a scrollable screen. All variants support intelligent keyboard avoiding behavior that automatically adjusts padding when the keyboard appears.

## Features

- **Three Variants**: Base, Static, and Scrollable variants for different use cases
- **Keyboard Avoiding**: Automatic padding adjustment when keyboard appears/disappears
- **Animated Transitions**: Smooth animations when keyboard state changes
- **Flexible Configuration**: Optional extra padding for bottom-fixed elements
- **Scroll Support**: ScrollView integration with keyboard-aware content insets
- **Theme Integration**: Uses unistyles for consistent styling
- **TypeScript Safety**: Fully typed props with discriminated union types
- **React Navigation Compatible**: Works seamlessly with React Navigation screens

## Architecture

The Screen component integrates with the global `KeyboardContext` ([KeyboardContext.tsx](src/shared/context/KeyboardContext.tsx)) to track keyboard state. The context provides:

- `isKeyboardVisible`: Boolean indicating keyboard visibility
- `keyboardHeight`: Numeric keyboard height (adjusted for safe area insets)
- `animatedKeyboardHeight`: Animated value for smooth transitions

## Usage

### Basic Screen

Simple flex container with no scrolling or keyboard behavior:

```tsx
import {Screen} from '@/shared/components/ui/screen'
;<Screen>
  <Text>Simple static content</Text>
</Screen>
```

### Static Screen (Non-Scrollable)

Best for screens with fixed content that doesn't scroll:

```tsx
// Without keyboard avoiding
<Screen.Static>
  <Text>Fixed content</Text>
</Screen.Static>

// With keyboard avoiding (for forms)
<Screen.Static keyboardAvoiding extraPadding={20}>
  <TextInput placeholder="Email" />
  <TextInput placeholder="Password" secureTextEntry />
  <Button title="Login" />
</Screen.Static>

// Keyboard avoiding without animation
<Screen.Static keyboardAvoiding animated={false}>
  <TextInput placeholder="Search" />
</Screen.Static>
```

### Scrollable Screen

Best for screens with content that may exceed viewport height:

```tsx
// Simple scrollable content
<Screen.Scrollable>
  <Text>Long article content...</Text>
  <Text>More content...</Text>
</Screen.Scrollable>

// With keyboard avoiding and scroll indicator
<Screen.Scrollable
  keyboardAvoiding
  extraPadding={20}
  showsVerticalScrollIndicator>
  <FlatList
    data={comments}
    renderItem={renderComment}
    scrollEnabled={false} // Disable nested scroll
  />
  <TextInput
    placeholder="Add a comment..."
    multiline
  />
</Screen.Scrollable>

// With custom ScrollView props
const scrollViewRef = React.useRef<ScrollView>(null);

<Screen.Scrollable
  keyboardAvoiding
  scrollViewProps={{
    ref: scrollViewRef,
    onContentSizeChange: () => {
      scrollViewRef.current?.scrollToEnd({animated: true});
    },
  }}>
  {messages.map(renderMessage)}
  <TextInput placeholder="Type a message..." />
</Screen.Scrollable>
```

### Custom Styling

All variants accept custom styles:

```tsx
<Screen.Scrollable
  style={{backgroundColor: '#f5f5f5'}}
  contentContainerStyle={{padding: 16}}>
  <Text>Content with custom styling</Text>
</Screen.Scrollable>
```

## Props

### Base Screen Props

- `children` (ReactNode, required): Content to render inside the screen
- `style` (ViewStyle, optional): Custom style for the screen container

### Static Screen Props

Extends Base Screen Props with:

- `keyboardAvoiding` (boolean, default: false): Add padding when keyboard is visible
- `extraPadding` (number, default: 0): Additional padding beyond keyboard height
- `animated` (boolean, default: true): Animate padding changes when keyboard appears/disappears

### Scrollable Screen Props

Extends Base Screen Props and KeyboardAvoidingConfig with:

- `keyboardAvoiding` (boolean, default: false): Add padding when keyboard is visible
- `extraPadding` (number, default: 0): Additional padding beyond keyboard height
- `animated` (boolean, default: true): Animate padding changes when keyboard appears/disappears
- `contentContainerStyle` (ViewStyle, optional): Style for ScrollView's content container
- `showsVerticalScrollIndicator` (boolean, default: false): Show vertical scroll indicator
- `scrollViewProps` (ScrollViewProps, optional): Additional ScrollView props (excludes style and contentContainerStyle)

## Keyboard Avoiding Behavior

### How It Works

1. The `KeyboardContext` tracks keyboard show/hide events and calculates the keyboard height
2. The keyboard height is automatically adjusted for safe area bottom inset
3. When `keyboardAvoiding` is enabled, the component adds `keyboardHeight + extraPadding` as bottom padding
4. By default, padding changes are animated using `Animated.Value` for smooth transitions
5. Set `animated={false}` for instant padding changes without animation

### When to Use Extra Padding

Use `extraPadding` when you have bottom-fixed elements (like buttons or submit controls) that need to remain visible above the keyboard:

```tsx
<Screen.Static
  keyboardAvoiding
  extraPadding={80}>
  <TextInput placeholder="Username" />
  <TextInput placeholder="Password" />
  {/* Button fixed at bottom - extraPadding ensures it stays above keyboard */}
  <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
    <Button title="Login" />
  </View>
</Screen.Static>
```

### Accessing Keyboard State

Use the `useKeyboard` hook to access keyboard state anywhere in the app:

```tsx
import {useKeyboard} from '@/store/context/KeyboardContext'

const MyComponent = (): React.JSX.Element => {
  const {isKeyboardVisible, keyboardHeight} = useKeyboard()

  return (
    <View>
      <Text>Keyboard is {isKeyboardVisible ? 'visible' : 'hidden'}</Text>
      <Text>Height: {keyboardHeight}px</Text>
    </View>
  )
}
```

## Choosing the Right Variant

| Variant               | Use Case                                    | Scrolling | Keyboard Avoiding |
| --------------------- | ------------------------------------------- | --------- | ----------------- |
| `<Screen>`            | Simple static content with no special needs | No        | No                |
| `<Screen.Static>`     | Fixed layout screens, forms, login/signup   | No        | Optional          |
| `<Screen.Scrollable>` | Long content, articles, feeds, chat screens | Yes       | Optional          |

## Integration with React Navigation

The Screen component works seamlessly with React Navigation. Simply wrap your screen content:

```tsx
export const LoginScreen = (): React.JSX.Element => {
  return (
    <Screen.Static
      keyboardAvoiding
      extraPadding={20}>
      <Text>Login</Text>
      <TextInput placeholder="Email" />
      <TextInput
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" />
    </Screen.Static>
  )
}

export const ArticleScreen = (): React.JSX.Element => {
  return (
    <Screen.Scrollable>
      <Text>Article Title</Text>
      <Text>Long article content...</Text>
    </Screen.Scrollable>
  )
}
```

## Implementation Details

- Uses `react-native-unistyles` StyleSheet for theme integration
- Static variant conditionally renders `View` or `Animated.View` based on keyboard avoiding settings
- Scrollable variant conditionally renders `ScrollView` or `Animated.ScrollView` when animation is enabled
- ScrollView has `keyboardShouldPersistTaps="handled"` for proper form interaction
- All variants use `flex: 1` container style for full-screen layout
- Scrollable variant uses `flexGrow: 1` for content container to ensure proper scrolling behavior

## Best Practices

1. **Choose the right variant**: Use `Screen.Static` for forms and fixed layouts, `Screen.Scrollable` for content that might overflow
2. **Enable keyboard avoiding on forms**: Always use `keyboardAvoiding` on screens with text inputs
3. **Use extraPadding for bottom buttons**: Add extra padding when you have fixed bottom elements
4. **Disable animation when needed**: Set `animated={false}` for instant keyboard response in specific cases
5. **Avoid nested ScrollViews**: When using `Screen.Scrollable` with FlatList/SectionList, set `scrollEnabled={false}` on the list
6. **Custom scroll behavior**: Use `scrollViewProps` to pass refs and event handlers to the underlying ScrollView
