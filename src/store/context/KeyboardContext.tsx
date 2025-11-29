import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {Animated, Keyboard, KeyboardEvent, Platform} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

/**
 * Values provided by the KeyboardContext for tracking keyboard state.
 */
type KeyboardContextValue = {
  /**
   * Current keyboard height in pixels, adjusted for safe area bottom inset.
   * This is a static number that updates when keyboard show/hide events occur.
   */
  keyboardHeight: number
  /**
   * Animated value that tracks keyboard height for smooth transitions.
   * Use with Animated components for animated keyboard avoiding behavior.
   */
  animatedKeyboardHeight: Animated.Value
  /**
   * Boolean indicating whether the keyboard is currently visible.
   */
  isKeyboardVisible: boolean
}

const KeyboardContext = createContext<KeyboardContextValue | undefined>(
  undefined,
)

/**
 * Props for the KeyboardProvider component.
 */
type KeyboardProviderProps = {
  /**
   * Child components that will have access to keyboard context.
   */
  children: ReactNode
}

/**
 * Provider component that tracks keyboard visibility and height throughout the app.
 * Listens to keyboard show/hide events and provides both static and animated values.
 * Automatically adjusts keyboard height for safe area bottom inset.
 *
 * Uses platform-specific events (keyboardWillShow/Hide on iOS, keyboardDidShow/Hide on Android)
 * for optimal timing with the keyboard animation.
 *
 * @param props - The provider properties
 * @returns A context provider wrapping the children
 */
export const KeyboardProvider = ({
  children,
}: KeyboardProviderProps): React.JSX.Element => {
  const insets = useSafeAreaInsets()
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const animatedKeyboardHeight = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'

    let isMounted = true

    /**
     * Handles keyboard show events.
     * Calculates height adjusted for safe area insets and triggers animation.
     *
     * @param event - The keyboard event containing height and duration info
     */
    const onKeyboardShow = (event: KeyboardEvent): void => {
      if (!isMounted) return

      const height = event.endCoordinates.height - insets.bottom
      setKeyboardHeight(height)
      setIsKeyboardVisible(true)

      Animated.timing(animatedKeyboardHeight, {
        toValue: height,
        duration: event.duration || 250,
        useNativeDriver: false,
      }).start()
    }

    /**
     * Handles keyboard hide events.
     * Resets height to 0 and triggers hide animation.
     *
     * @param event - The keyboard event containing duration info
     */
    const onKeyboardHide = (event: KeyboardEvent): void => {
      if (!isMounted) return

      setKeyboardHeight(0)
      setIsKeyboardVisible(false)

      Animated.timing(animatedKeyboardHeight, {
        toValue: 0,
        duration: event.duration || 250,
        useNativeDriver: false,
      }).start()
    }

    const showSubscription = Keyboard.addListener(showEvent, onKeyboardShow)
    const hideSubscription = Keyboard.addListener(hideEvent, onKeyboardHide)

    return (): void => {
      isMounted = false
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [insets.bottom, animatedKeyboardHeight])

  const value = useMemo(
    () => ({
      keyboardHeight,
      animatedKeyboardHeight,
      isKeyboardVisible,
    }),
    [keyboardHeight, animatedKeyboardHeight, isKeyboardVisible],
  )

  return (
    <KeyboardContext.Provider value={value}>
      {children}
    </KeyboardContext.Provider>
  )
}

/**
 * Hook to access keyboard state from anywhere in the component tree.
 * Must be used within a KeyboardProvider.
 *
 * @returns Keyboard context values including height, animated height, and visibility state
 * @throws Error if used outside of KeyboardProvider
 *
 * @example
 * ```tsx
 * const { isKeyboardVisible, keyboardHeight, animatedKeyboardHeight } = useKeyboard();
 *
 * // Use static height
 * <View style={{ paddingBottom: keyboardHeight }} />
 *
 * // Use animated height
 * <Animated.View style={{ paddingBottom: animatedKeyboardHeight }} />
 * ```
 */
export const useKeyboard = (): KeyboardContextValue => {
  const context = useContext(KeyboardContext)

  if (context === undefined) {
    throw new Error('useKeyboard must be used within a KeyboardProvider')
  }

  return context
}
