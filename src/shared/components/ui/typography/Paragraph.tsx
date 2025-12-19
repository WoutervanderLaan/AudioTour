import type React from 'react'

import {TextBase, type TextProps} from './TextBase'

import type {ParagraphVariants} from '@/themes/tokens/text'

/**
 * ParagraphProps
 * Props for the Paragraph component
 */
export type ParagraphProps = Omit<TextProps, 'fontSize' | 'lineHeight'> & {
  /**
   * variant - Paragraph variant (body, intro, quote, small, extraSmall)
   */
  variant?: ParagraphVariants
}

/**
 * Paragraph
 * Semantic paragraph component for body text.
 * Uses the base TextBase component with predefined typography settings.
 *
 * @param {ParagraphProps} props - Component props
 * @returns {React.JSX.Element} Rendered paragraph element
 */
export const Paragraph = ({
  variant = 'body',
  fontFamily = 'regular',
  children,
  ...rest
}: ParagraphProps): React.JSX.Element => {
  return (
    <TextBase
      fontSize={variant}
      fontFamily={fontFamily}
      lineHeight={variant}
      {...rest}>
      {children}
    </TextBase>
  )
}
