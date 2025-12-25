import type {themes} from './themes'
import type {opacityTokens} from './tokens/opacity'
import type {sizeTokens} from './tokens/size'
import type {StyleTokens} from './tokens/styles'
import type {TextTokens} from './tokens/text'
import type {zIndexTokens} from './tokens/zIndex'

/**
 * ColorTokens
 * Type defining all color tokens for the theme including colors for pressable elements, screens, text, borders, transparent colors, and text inputs.
 */
export type ColorTokens = {
  /**
   * pressable
   */
  pressable: {
    primary: {
      default: {
        background: string
        border: string
        label: string
      }
      pressed: {
        background: string
        border: string
        label: string
      }
    }
    secondary: {
      default: {
        background: string
        border: string
        label: string
      }
      pressed: {
        background: string
        border: string
        label: string
      }
    }
  }
  /**
   * screen
   */
  screen: {
    background: {
      default: string
      settings: string
    }
  }
  /**
   * text
   */
  text: {
    confirm: string
    default: string
    inverse: string
    link: string
    secondary: string
    tertiary: string
    warning: string
  }
  /**
   * border
   */
  border: {
    default: string
  }
  /**
   * transparent
   */
  transparent: {
    full: string
  }
  /**
   * textInput
   */
  textInput: {
    container: {
      background: string
    }
  }
}

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
