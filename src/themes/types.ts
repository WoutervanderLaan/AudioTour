import type {themes} from './themes'
import type {sizeTokens} from './tokens/size'
import type {TextTokens} from './tokens/text'

/**
 * ColorTokens
 * TODO: describe what this type represents.
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
