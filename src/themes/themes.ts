import {type Theme, ThemeVariant} from './types'

import {sizeTokens} from '@/themes/tokens/size'
import {textTokens} from '@/themes/tokens/text'
import {darkColorTokens} from '@/themes/tokens/themeDark'
import {lightColorTokens} from '@/themes/tokens/themeLight'

const baseTheme = {
  size: sizeTokens,
  text: textTokens,
}

export const lightTheme: Theme = {
  id: ThemeVariant.light,
  ...baseTheme,
  color: lightColorTokens,
}

export const darkTheme: Theme = {
  id: ThemeVariant.dark,
  ...baseTheme,
  color: darkColorTokens,
}

export const themes = {
  [ThemeVariant.light]: lightTheme,
  [ThemeVariant.dark]: darkTheme,
} satisfies Record<ThemeVariant, Theme>
