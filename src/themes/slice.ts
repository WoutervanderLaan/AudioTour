import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'

import {themes} from './themes'
import {type Theme, ThemeVariant} from './types'

/**
 * ThemeState
 * TODO: describe what this type represents.
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
 * TODO: describe what it does.
 *
 * @param {*} state
 * @returns {*} describe return value
 */
export const selectTheme = (state: ThemeState): Theme => themes[state.theme]
