import {color} from '@/themes/tokens/color'

/**
 * ColorTokens
 * TODO: describe what this type represents.
 */
export type ColorTokens = typeof lightColorTokens

/**
 * The light color theme, the keys of the object should not contain any color name at all
 */
export const lightColorTokens = {
  pressable: {
    primary: {
      default: {
        background: color.primary.blue,
        border: color.transparent.full,
        label: color.primary.white,
      },
      pressed: {
        background: color.secondary.darkblue,
        border: color.transparent.full,
        label: color.primary.white,
      },
    },
    secondary: {
      default: {
        background: color.primary.white,
        border: color.primary.blue,
        icon: color.primary.blue,
        label: color.primary.blue,
      },
      pressed: {
        background: color.primary.white,
        border: color.secondary.darkblue,
        label: color.secondary.darkblue,
      },
    },
  },
  screen: {
    background: {
      default: color.primary.white,
      settings: color.custom.grey0,
    },
  },

  text: {
    confirm: color.secondary.darkgreen,
    default: color.primary.black,
    inverse: color.primary.white,
    link: color.primary.blue,
    secondary: color.neutral.grey3,
    tertiary: color.neutral.grey2,
    warning: color.primary.red,
  },
  textInput: {
    container: {
      background: color.primary.white,
    },
  },
}
