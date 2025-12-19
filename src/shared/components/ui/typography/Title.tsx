import type React from 'react'

import {TextBase, type TextProps} from './TextBase'

/**
 * TitleLevel
 * Heading levels for the Title component
 */
export type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

/**
 * TitleProps
 * Props for the Title component
 */
export type TitleProps = Omit<TextProps, 'fontSize' | 'lineHeight'> & {
  /**
   * level - Heading level (h1-h6)
   */
  level?: TitleLevel
}

/**
 * Title
 * Semantic heading component for titles.
 * Uses the base TextBase component with predefined typography settings.
 * Automatically uses Playfair Display font for titles/headings.
 *
 * @param {TitleProps} props - Component props
 * @returns {React.JSX.Element} Rendered title element
 */
export const Title = ({
  level = 'h1',
  fontFamily = 'headingBold',
  children,
  ...rest
}: TitleProps): React.JSX.Element => {
  return (
    <TextBase
      fontSize={level}
      lineHeight={level}
      fontFamily={fontFamily}
      accessibilityRole="header"
      {...rest}>
      {children}
    </TextBase>
  )
}
