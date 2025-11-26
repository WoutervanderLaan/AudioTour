import type React from 'react'

import {TextBase, type TextProps} from './TextBase'

/**
 * LabelProps
 * Props for the Label component
 */
export type LabelProps = Omit<TextProps, 'fontSize' | 'lineHeight'>

/**
 * Label
 * Semantic label component for form labels and UI labels.
 * Uses the base TextBase component with small text size.
 *
 * @param {LabelProps} props - Component props
 * @returns {React.JSX.Element} Rendered label element
 */
export const Label = ({children, ...rest}: LabelProps): React.JSX.Element => {
  return (
    <TextBase
      fontSize="small"
      lineHeight="small"
      {...rest}>
      {children}
    </TextBase>
  )
}
