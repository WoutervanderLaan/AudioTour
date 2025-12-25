import type {ColorTokens} from '@/themes/types'

import type {sizeTokens} from './size'

/**
 * Style combination tokens for consistent, reusable styling patterns.
 *
 * These tokens provide pre-configured style combinations that can be spread
 * into StyleSheet.create() calls to ensure visual consistency across the app.
 *
 * @example
 * ```typescript
 * StyleSheet.create(theme => ({
 *   container: {
 *     ...theme.styles.border.default,
 *     padding: theme.size.md,
 *   },
 * }))
 * ```
 */

/**
 * BorderStyles
 * Type defining all available border style combinations.
 */
export type BorderStyles = {
  /**
   * Default border style with medium border radius and standard border color.
   */
  default: {
    borderColor: string
    borderRadius: number
    borderWidth: number
  }
  /**
   * Alternative border style with sharp corners and thin border.
   */
  sharp: {
    borderColor: string
    borderRadius: number
    borderWidth: number
  }
  /**
   * Rounded border style with large border radius for pill-shaped elements.
   */
  rounded: {
    borderColor: string
    borderRadius: number
    borderWidth: number
  }
  /**
   * Thick border style for emphasized elements.
   */
  thick: {
    borderColor: string
    borderRadius: number
    borderWidth: number
  }
  /**
   * No border style (useful for removing borders).
   */
  none: {
    borderColor: string
    borderRadius: number
    borderWidth: number
  }
}

/**
 * ShadowStyles
 * Type defining all available shadow/elevation style combinations.
 */
export type ShadowStyles = {
  /**
   * Small shadow for subtle elevation (z-index 1).
   */
  sm: {
    elevation: number
    shadowColor: string
    shadowOffset: {height: number; width: number}
    shadowOpacity: number
    shadowRadius: number
  }
  /**
   * Medium shadow for moderate elevation (z-index 2).
   */
  md: {
    elevation: number
    shadowColor: string
    shadowOffset: {height: number; width: number}
    shadowOpacity: number
    shadowRadius: number
  }
  /**
   * Large shadow for strong elevation (z-index 3).
   */
  lg: {
    elevation: number
    shadowColor: string
    shadowOffset: {height: number; width: number}
    shadowOpacity: number
    shadowRadius: number
  }
  /**
   * No shadow (removes all shadow styling).
   */
  none: {
    elevation: number
    shadowColor: string
    shadowOffset: {height: number; width: number}
    shadowOpacity: number
    shadowRadius: number
  }
}

/**
 * CardStyles
 * Type defining all available card style combinations (border + shadow + background).
 */
export type CardStyles = {
  /**
   * Default card style with subtle elevation and rounded corners.
   */
  default: {
    backgroundColor: string
    borderColor: string
    borderRadius: number
    borderWidth: number
    elevation: number
    shadowColor: string
    shadowOffset: {height: number; width: number}
    shadowOpacity: number
    shadowRadius: number
  }
  /**
   * Elevated card style with stronger shadow and no border.
   */
  elevated: {
    backgroundColor: string
    borderColor: string
    borderRadius: number
    borderWidth: number
    elevation: number
    shadowColor: string
    shadowOffset: {height: number; width: number}
    shadowOpacity: number
    shadowRadius: number
  }
  /**
   * Outlined card style with border and no shadow.
   */
  outlined: {
    backgroundColor: string
    borderColor: string
    borderRadius: number
    borderWidth: number
    elevation: number
    shadowColor: string
    shadowOffset: {height: number; width: number}
    shadowOpacity: number
    shadowRadius: number
  }
  /**
   * Flat card style with no border or shadow (just background).
   */
  flat: {
    backgroundColor: string
    borderColor: string
    borderRadius: number
    borderWidth: number
    elevation: number
    shadowColor: string
    shadowOffset: {height: number; width: number}
    shadowOpacity: number
    shadowRadius: number
  }
}

/**
 * InputStyles
 * Type defining all available text input style combinations.
 */
export type InputStyles = {
  /**
   * Default input style with border and background.
   */
  default: {
    backgroundColor: string
    borderColor: string
    borderRadius: number
    borderWidth: number
    paddingHorizontal: number
    paddingVertical: number
  }
  /**
   * Focused input style with emphasized border.
   */
  focused: {
    backgroundColor: string
    borderColor: string
    borderRadius: number
    borderWidth: number
    paddingHorizontal: number
    paddingVertical: number
  }
  /**
   * Error input style with warning border color.
   */
  error: {
    backgroundColor: string
    borderColor: string
    borderRadius: number
    borderWidth: number
    paddingHorizontal: number
    paddingVertical: number
  }
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
   * card - Card style combinations (border + shadow + background)
   */
  card: CardStyles
  /**
   * input - Text input style combinations
   */
  input: InputStyles
  /**
   * shadow - Shadow/elevation style combinations
   */
  shadow: ShadowStyles
}

/**
 * Creates style combination tokens from base theme tokens.
 *
 * This factory function generates all style combinations based on the provided
 * color and size tokens, ensuring consistency with the theme.
 *
 * @param color - Color tokens from the theme
 * @param size - Size tokens from the theme
 * @returns Complete set of style combination tokens
 */
export const createStyleTokens = (
  color: ColorTokens,
  size: typeof sizeTokens,
): StyleTokens => {
  return {
    border: {
      default: {
        borderWidth: 1,
        borderColor: color.border.default,
        borderRadius: size.md,
      },
      sharp: {
        borderWidth: 1,
        borderColor: color.border.default,
        borderRadius: size.no,
      },
      rounded: {
        borderWidth: 1,
        borderColor: color.border.default,
        borderRadius: size.xxl,
      },
      thick: {
        borderWidth: 2,
        borderColor: color.border.default,
        borderRadius: size.md,
      },
      none: {
        borderWidth: 0,
        borderColor: color.transparent.full,
        borderRadius: size.no,
      },
    },
    shadow: {
      sm: {
        shadowColor: color.text.default,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
      },
      md: {
        shadowColor: color.text.default,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
      },
      lg: {
        shadowColor: color.text.default,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
      },
      none: {
        shadowColor: color.transparent.full,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      },
    },
    card: {
      default: {
        backgroundColor: color.screen.background.default,
        borderRadius: size.md,
        borderWidth: 1,
        borderColor: color.border.default,
        shadowColor: color.text.default,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
      },
      elevated: {
        backgroundColor: color.screen.background.default,
        borderRadius: size.md,
        borderWidth: 0,
        borderColor: color.transparent.full,
        shadowColor: color.text.default,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
      },
      outlined: {
        backgroundColor: color.screen.background.default,
        borderRadius: size.md,
        borderWidth: 1,
        borderColor: color.border.default,
        shadowColor: color.transparent.full,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      },
      flat: {
        backgroundColor: color.screen.background.default,
        borderRadius: size.md,
        borderWidth: 0,
        borderColor: color.transparent.full,
        shadowColor: color.transparent.full,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      },
    },
    input: {
      default: {
        backgroundColor: color.textInput.container.background,
        borderWidth: 1,
        borderColor: color.border.default,
        borderRadius: size.sm,
        paddingHorizontal: size.md,
        paddingVertical: size.smd,
      },
      focused: {
        backgroundColor: color.textInput.container.background,
        borderWidth: 2,
        borderColor: color.pressable.primary.default.background,
        borderRadius: size.sm,
        paddingHorizontal: size.md,
        paddingVertical: size.smd,
      },
      error: {
        backgroundColor: color.textInput.container.background,
        borderWidth: 2,
        borderColor: color.text.warning,
        borderRadius: size.sm,
        paddingHorizontal: size.md,
        paddingVertical: size.smd,
      },
    },
  }
}
