import {SizeTokens, sizeTokens} from '@/themes/tokens/size'
import {TextTokens, textTokens} from '@/themes/tokens/text'
import {ColorTokens, lightColorTokens} from '@/themes/tokens/themeLight'

/**
 * Theme
 * TODO: describe what this type represents.
 */
export type Theme = {
  /**
   * color
   */
  color: ColorTokens
  /**
   * duration
   */
  id: string
  /**
   * size
   */
  size: SizeTokens
  /**
   * text
   */
  text: TextTokens
}

export const themeId = 'light'

export const lightTheme: Theme = {
  id: themeId,
  size: sizeTokens,
  text: textTokens,
  color: lightColorTokens,
}

export const themes = {
  light: lightTheme,
} satisfies Record<string, Theme>

/**
 * Themes
 * TODO: describe what this type represents.
 */
export type Themes = keyof typeof themes
