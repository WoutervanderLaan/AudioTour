import {type Theme, ThemeVariant} from './types'

import {sizeTokens} from '@/themes/tokens/size'
import {textTokens} from '@/themes/tokens/text'
import {darkColorTokens} from '@/themes/tokens/themeDark'
import {lightColorTokens} from '@/themes/tokens/themeLight'

const baseTheme = {
  size: sizeTokens,
  text: textTokens,
}

/**
 * Light theme configuration.
 *
 * Complete theme object with light color palette and shared tokens.
 */
export const lightTheme: Theme = {
  id: ThemeVariant.light,
  ...baseTheme,
  color: lightColorTokens,
}

/**
 * Dark theme configuration.
 *
 * Complete theme object with dark color palette and shared tokens.
 */
export const darkTheme: Theme = {
  id: ThemeVariant.dark,
  ...baseTheme,
  color: darkColorTokens,
}

/**
 * Theme registry mapping theme variant names to theme objects.
 *
 * Used by unistyles to enable dynamic theme switching.
 */
export const themes = {
  [ThemeVariant.light]: lightTheme,
  [ThemeVariant.dark]: darkTheme,
} satisfies Record<ThemeVariant, Theme>
