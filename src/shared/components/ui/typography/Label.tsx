import type React from 'react'

import {Text, type TextProps} from './Text'

/**
 * LabelProps
 * Props for the Label component
 */
export type LabelProps = Omit<TextProps, 'fontSize' | 'lineHeight'>

/**
 * Label
 * Semantic label component for form labels and UI labels.
 * Uses the base Text component with small text size.
 *
 * @param {LabelProps} props - Component props
 * @returns {React.JSX.Element} Rendered label element
 */
export const Label = ({children, ...rest}: LabelProps): React.JSX.Element => {
  return (
    <Text
      fontSize="small"
      lineHeight="small"
      {...rest}>
      {children}
    </Text>
  )
}
