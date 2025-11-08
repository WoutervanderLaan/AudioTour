/**
 * SizeTokens
 * TODO: describe what this type represents.
 */
export type SizeTokens = typeof sizeTokens
/**
 * SpacingTokens
 * TODO: describe what this type represents.
 */
export type SpacingTokens = typeof sizeTokens.spacing

export const sizeTokens = {
  spacing: {
    no: 0,
    xxs: 2,
    xs: 4,
    sm: 8,
    smd: 12,
    md: 16,
    lg: 24,
    xl: 40,
    xxl: 80,
  },
} as const
