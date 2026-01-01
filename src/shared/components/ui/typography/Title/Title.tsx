import type React from 'react'

import {TextBase} from '../TextBase/TextBase'
import type {TitleProps} from './Title.types'

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
