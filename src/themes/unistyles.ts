import {StyleSheet} from 'react-native-unistyles'

import {themes} from './themes'

/**
 * Unistyles configuration for the application theme system.
 *
 * Configures react-native-unistyles with adaptive theme support, allowing
 * automatic theme switching based on system appearance (light/dark mode).
 */
StyleSheet.configure({
  settings: {
    adaptiveThemes: true,
  },
  themes,
})
