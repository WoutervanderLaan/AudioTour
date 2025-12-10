import type React from 'react'

import {TextBase, type TextProps} from './TextBase'

/**
 * LabelProps
 * Props for the Text.Label component
 */
export type LabelProps = Omit<TextProps, 'fontSize' | 'lineHeight'>

/**
 * Text.Label
 * Semantic label component for form labels and UI labels.
 * Uses the base TextBase component with small text size.
 *
 * @param {LabelProps} props - Component props
 * @returns {React.JSX.Element} Rendered label element
 */
export const Label = ({children, ...rest}: LabelProps): React.JSX.Element => {
  return (
    <TextBase
      fontSize="extraSmall"
      lineHeight="extraSmall"
      {...rest}>
      {children}
    </TextBase>
  )
}
