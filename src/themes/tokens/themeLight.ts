import {color} from '@/themes/tokens/color'

/**
 * The light color theme, the keys of the object should not contain any color name at all
 */
export const lightColorTokens = {
  pressable: {
    primary: {
      default: {
        background: color.secondary.darkblue,
        border: color.transparent.full,
        label: color.primary.white,
      },
      pressed: {
        background: color.secondary.lightBlue,
        border: color.transparent.full,
        label: color.primary.white,
      },
    },
    secondary: {
      default: {
        background: color.primary.white,
        border: color.secondary.darkblue,
        label: color.secondary.darkblue,
      },
      pressed: {
        background: color.neutral.grey1,
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
    confirm: color.secondary.darkGreen,
    default: color.primary.black,
    inverse: color.primary.white,
    link: color.primary.blue,
    secondary: color.neutral.grey3,
    tertiary: color.neutral.grey2,
    warning: color.primary.red,
  },
  border: {default: color.primary.black},
  banner: {
    info: {background: color.secondary.lightBlue, text: color.primary.black},
    warning: {background: color.primary.red, text: color.primary.white},
    success: {
      background: color.secondary.lightGreen,
      text: color.primary.black,
    },
  },
  toast: {
    info: {background: color.primary.white, text: color.primary.black},
    warning: {background: color.primary.red, text: color.primary.white},
    success: {
      background: color.secondary.lightGreen,
      text: color.primary.black,
    },
  },
} as const
