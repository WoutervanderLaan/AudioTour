import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'

import {type Theme, type Themes, themes} from './themes'

/**
 * ThemeState
 * TODO: describe what this type represents.
 */
export type ThemeState = {
  /**
   * theme
   */
  theme: Themes
}

export const useThemeStore = create<ThemeState>()(
  immer(_set => ({
    theme: 'light',
  })),
)

/**
 * selectTheme
 * TODO: describe what it does.
 *
 * @param {*} state
 * @returns {*} describe return value
 */
export const selectTheme = (state: ThemeState): Theme => themes[state.theme]
