import {color} from '@/themes/tokens/color'

/**
 * The dark color theme, the keys of the object should not contain any color name at all
 */
export const darkColorTokens = {
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
        background: color.neutral.grey4,
        border: color.primary.white,
        icon: color.primary.blue,
        label: color.primary.blue,
      },
      pressed: {
        background: color.neutral.grey3,
        border: color.secondary.darkblue,
        label: color.secondary.darkblue,
      },
    },
  },
  screen: {
    background: {
      default: color.primary.black,
      settings: color.neutral.grey4,
    },
  },

  text: {
    confirm: color.secondary.lightgreen,
    default: color.primary.white,
    inverse: color.primary.black,
    link: color.secondary.lightgreen,
    secondary: color.neutral.grey2,
    tertiary: color.neutral.grey3,
    warning: color.primary.red,
  },
  textInput: {
    container: {
      background: color.neutral.grey4,
    },
  },
}
