import type {ColorTokens, SizeTokens, StyleTokens} from '@/themes/types'

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
  size: SizeTokens,
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
    },
  }
}
