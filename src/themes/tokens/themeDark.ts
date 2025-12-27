import type {ColorTokens} from '../types'

import {color} from '@/themes/tokens/color'

/**
 * The dark color theme, the keys of the object should not contain any color name at all
 */
export const darkColorTokens: ColorTokens = {
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
    confirm: color.secondary.lightGreen,
    default: color.primary.white,
    inverse: color.primary.black,
    link: color.secondary.lightGreen,
    secondary: color.neutral.grey2,
    tertiary: color.neutral.grey3,
    warning: color.primary.red,
  },
  border: {default: color.primary.white},
  banner: {
    info: {background: color.secondary.purple, text: color.primary.white},
    warning: {background: color.primary.red, text: color.primary.white},
    success: {
      background: color.secondary.darkGreen,
      text: color.primary.white,
    },
  },
  toast: {
    info: {background: color.secondary.purple, text: color.primary.white},
    warning: {background: color.primary.red, text: color.primary.white},
    success: {
      background: color.secondary.darkGreen,
      text: color.primary.white,
    },
  },
}
