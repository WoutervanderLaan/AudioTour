import type {themes} from './themes'
import type {opacityTokens} from './tokens/opacity'
import type {sizeTokens} from './tokens/size'
import type {TextTokens} from './tokens/text'
import type {lightColorTokens} from './tokens/themeLight'
import type {zIndexTokens} from './tokens/zIndex'

/**
 * StringLeaf
 * TODO: describe what this type represents.
 */
type StringLeaf<T> = {
  [K in keyof T]: T[K] extends object ? StringLeaf<T[K]> : string
}

/**
 * ColorTokens
 * Type defining all color tokens for the theme including colors for pressable elements, screens, text, borders, transparent colors, and text inputs.
 */
export type ColorTokens = StringLeaf<typeof lightColorTokens>

/**
 * SizeTokens
 * Type defining all spacing, padding, and size tokens used throughout the application.
 */
export type SizeTokens = typeof sizeTokens

/**
 * OpacityTokens
 * Type defining all spacing, padding, and size tokens used throughout the application.
 */
export type OpacityTokens = typeof opacityTokens

/**
 * OpacityTokens
 * Type defining all spacing, padding, and size tokens used throughout the application.
 */
export type ZIndexTokens = typeof zIndexTokens

/**
 * Theme
 * Complete theme object containing all design tokens including colors, sizes, text styles, style combinations, and theme metadata.
 */
export type Theme = {
  /**
   * color
   */
  color: ColorTokens
  /**
   * id
   */
  id: string
  /**
   * opacity
   */
  opacity: OpacityTokens
  /**
   * size
   */
  size: SizeTokens
  /**
   * styles - Reusable style combinations (borders, shadows, cards, inputs)
   */
  styles: StyleTokens
  /**
   * text
   */
  text: TextTokens
  /**
   * zIndex
   */
  zIndex: ZIndexTokens
}
export enum ThemeVariant {
  light = 'light',
  dark = 'dark',
}

/**
 * AppThemes
 * Type representing all available theme variants in the application (light and dark themes).
 */
export type AppThemes = typeof themes

/**
 * BorderStyle
 * TODO: describe what this type represents.
 */
type BorderStyle = {
  /**
   * borderColor
   */
  borderColor: string
  /**
   * borderRadius
   */
  borderRadius: number
  /**
   * borderWidth
   */
  borderWidth: number
}

/**
 * BorderStyles
 * Type defining all available border style combinations.
 */
export type BorderStyles = {
  /**
   * Default border style with medium border radius and standard border color.
   */
  default: BorderStyle
  /**
   * Alternative border style with sharp corners and thin border.
   */
  sharp: BorderStyle
  /**
   * Rounded border style with large border radius for pill-shaped elements.
   */
  rounded: BorderStyle
  /**
   * Thick border style for emphasized elements.
   */
  thick: BorderStyle
}

/**
 * ShadowStyle
 * TODO: describe what this type represents.
 */
type ShadowStyle = {
  /**
   * elevation
   */
  elevation: number
  /**
   * shadowColor
   */
  shadowColor: string
  /**
   * shadowOffset
   */
  shadowOffset: {height: number; width: number}
  /**
   * shadowOpacity
   */
  shadowOpacity: number
  /**
   * shadowRadius
   */
  shadowRadius: number
}

/**
 * ShadowStyles
 * Type defining all available shadow/elevation style combinations.
 */
export type ShadowStyles = {
  /**
   * Small shadow for subtle elevation (z-index 1).
   */
  sm: ShadowStyle
  /**
   * Medium shadow for moderate elevation (z-index 2).
   */
  md: ShadowStyle
  /**
   * Large shadow for strong elevation (z-index 3).
   */
  lg: ShadowStyle
}

/**
 * StyleTokens
 * Complete collection of all style combination tokens.
 */
export type StyleTokens = {
  /**
   * border - Border style combinations
   */
  border: BorderStyles
  /**
   * shadow - Shadow/elevation style combinations
   */
  shadow: ShadowStyles
}
