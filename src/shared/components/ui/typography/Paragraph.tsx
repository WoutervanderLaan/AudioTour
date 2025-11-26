import type React from 'react'

import {Text, type TextProps} from './Text'

import type {ParagraphVariants} from '@/themes/tokens/text'
import type {Theme} from '@/themes/types'

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
 * Uses the base Text component with predefined typography settings.
 *
 * @param {ParagraphProps} props - Component props
 * @returns {React.JSX.Element} Rendered paragraph element
 */
export const Paragraph = ({
  variant = 'body',
  children,
  ...rest
}: ParagraphProps): React.JSX.Element => {
  return (
    <Text
      fontSize={variant as keyof Theme['text']['fontSize']}
      lineHeight={variant as keyof Theme['text']['lineHeight']}
      {...rest}>
      {children}
    </Text>
  )
}
