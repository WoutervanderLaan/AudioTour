/**
 * Opacity tokens for component states.
 * Note: Values represent inverse opacity - 0 is fully transparent, 1 is fully opaque.
 * - full: Fully transparent (0)
 * - disabled: Semi-transparent for disabled states (0.5)
 * - pressed: Semi-transparent for pressed states (0.7)
 * - none: Fully opaque (1)
 */
export const opacityTokens = {
  full: 0,
  disabled: 0.5,
  pressed: 0.7,
  none: 1,
} as const
