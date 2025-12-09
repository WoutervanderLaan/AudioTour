import type {themes} from './themes'
import type {sizeTokens} from './tokens/size'
import type {TextTokens} from './tokens/text'

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
        icon: string
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
 * Theme
 * Complete theme object containing all design tokens including colors, sizes, text styles, and theme metadata.
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
 * Type representing all available theme variants in the application (light and dark themes).
 */
export type AppThemes = typeof themes
