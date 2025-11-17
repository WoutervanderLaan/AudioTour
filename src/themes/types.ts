import type {themes} from './themes'
import type {sizeTokens} from './tokens/size'
import type {TextTokens} from './tokens/text'
import type {lightColorTokens} from './tokens/themeLight'

/**
 * ColorTokens
 * TODO: describe what this type represents.
 */
export type ColorTokens = typeof lightColorTokens

/**
 * SizeTokens
 * TODO: describe what this type represents.
 */
export type SizeTokens = typeof sizeTokens

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
export enum ThemeVariant {
  light = 'light',
  dark = 'dark',
}

/**
 * AppThemes
 * TODO: describe what this type represents.
 */
export type AppThemes = typeof themes
