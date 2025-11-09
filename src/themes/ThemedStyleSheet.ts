// eslint-disable-next-line no-restricted-imports
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native'

import {useThemeStore} from '@/themes/slice'

import {themes} from './themes'
import type {Theme} from './types'

/**
 * NamedStyles
 * TODO: describe what this type represents.
 */
type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle}

/**
 * ThemedStyleSheetType
 * TODO: describe what this type represents.
 */
type ThemedStyleSheetType = {
  /**
   * create
   */
  create: <T extends NamedStyles<T> | NamedStyles<any>>(
    stylesFn: (theme: Theme) => T,
  ) => T
}

export const ThemedStyleSheet: ThemedStyleSheetType = {
  create: stylesFn => {
    const themeVariant = useThemeStore.getState().theme

    const theme = themes[themeVariant]
    return StyleSheet.create(stylesFn(theme))
  },
}
