import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Animated, Keyboard, KeyboardEvent, Platform} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {KeyboardContext} from './KeyboardContext'
import type {KeyboardProviderProps} from './KeyboardContext.types'

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
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true

    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'

    /**
     * Handles keyboard show events.
     * Calculates height adjusted for safe area insets and triggers animation.
     *
     * @param event - The keyboard event containing height and duration info
     */
    const onKeyboardShow = (event: KeyboardEvent): void => {
      if (isMountedRef.current === false) return

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
      if (isMountedRef.current === false) return

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
      isMountedRef.current = false
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
