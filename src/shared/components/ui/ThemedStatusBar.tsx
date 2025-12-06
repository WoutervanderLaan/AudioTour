import type React from 'react'
import {StatusBar} from 'react-native'

import {useNavigationTheme} from '@/shared/hooks/useNavigationTheme'

/**
 * ThemedStatusBarProps
 * Props for the ThemedStatusBar component
 */
export type ThemedStatusBarProps = {
  /**
   * Whether to animate status bar style changes
   * @default true
   */
  animated?: boolean
  /**
   * Whether to hide the status bar
   * @default false
   */
  hidden?: boolean
  /**
   * Override the bar style (defaults to theme-based style)
   */
  barStyle?: 'light-content' | 'dark-content' | 'default'
}

/**
 * ThemedStatusBar
 * A StatusBar component that automatically adapts its style based on the current theme.
 * Uses the useNavigationTheme hook to determine the appropriate bar style for light/dark mode.
 *
 * @param {ThemedStatusBarProps} props - Component props
 * @returns {React.JSX.Element} StatusBar component with theme-aware styling
 *
 * @example
 * ```tsx
 * // Basic usage - automatically adapts to theme
 * <ThemedStatusBar />
 *
 * // With custom props
 * <ThemedStatusBar animated={false} />
 * ```
 */
export const ThemedStatusBar = ({
  animated = true,
  hidden = false,
  barStyle,
}: ThemedStatusBarProps): React.JSX.Element => {
  const {statusBar} = useNavigationTheme()

  return (
    <StatusBar
      barStyle={barStyle ?? statusBar.barStyle}
      backgroundColor={statusBar.backgroundColor}
      animated={animated}
      hidden={hidden}
    />
  )
}
