import type React from 'react'

import {Text, type TextProps} from './Text'

import type {Theme} from '@/themes/types'

/**
 * TitleLevel
 * Heading levels for the Title component
 */
export type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

/**
 * TitleProps
 * Props for the Title component
 */
export type TitleProps = Omit<
  TextProps,
  'fontSize' | 'lineHeight' | 'fontFamily'
> & {
  /**
   * level - Heading level (h1-h6)
   */
  level?: TitleLevel
  /**
   * bold - Use bold font family
   */
  bold?: boolean
}

/**
 * Title
 * Semantic heading component for titles.
 * Uses the base Text component with predefined typography settings.
 *
 * @param {TitleProps} props - Component props
 * @returns {React.JSX.Element} Rendered title element
 */
export const Title = ({
  level = 'h1',
  bold = true,
  children,
  ...rest
}: TitleProps): React.JSX.Element => {
  return (
    <Text
      fontSize={level as keyof Theme['text']['fontSize']}
      lineHeight={level as keyof Theme['text']['lineHeight']}
      fontFamily={bold ? 'bold' : 'regular'}
      accessibilityRole="header"
      {...rest}>
      {children}
    </Text>
  )
}
