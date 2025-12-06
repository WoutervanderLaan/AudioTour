import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'

import {themes} from './themes'
import {type Theme, ThemeVariant} from './types'

/**
 * ThemeState
 * Zustand store state for managing the active theme variant (light or dark mode).
 */
export type ThemeState = {
  /**
   * theme
   */
  theme: ThemeVariant
}

export const useThemeStore = create<ThemeState>()(
  immer(_set => ({
    theme: ThemeVariant.light,
  })),
)

/**
 * selectTheme
 * Selector function that retrieves the full theme object based on the current theme variant in state.
 *
 * @param {*} state
 * @returns {*} Complete theme object with all tokens and styles
 */
export const selectTheme = (state: ThemeState): Theme => themes[state.theme]
