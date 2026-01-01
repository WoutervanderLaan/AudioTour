import type React from 'react'

import {TextBase} from '../TextBase/TextBase'
import type {ParagraphProps} from './Paragraph.types'

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
