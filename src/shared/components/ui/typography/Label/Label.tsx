import type React from 'react'

import {TextBase} from '../TextBase/TextBase'
import type {LabelProps} from './Label.types'

/**
 * Text.Label
 * Semantic label component for form labels and UI labels.
 * Uses the base TextBase component with small text size.
 *
 * @param {LabelProps} props - Component props
 * @returns {React.JSX.Element} Rendered label element
 */
export const Label = ({
  children,
  fontFamily = 'semiBold',
  ...rest
}: LabelProps): React.JSX.Element => {
  return (
    <TextBase
      fontSize="extraSmall"
      fontFamily={fontFamily}
      lineHeight="extraSmall"
      {...rest}>
      {children}
    </TextBase>
  )
}
