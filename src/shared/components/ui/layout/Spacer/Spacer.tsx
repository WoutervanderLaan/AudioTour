import React from 'react'

import {Box} from '../Box/Box'
import type {SpacerProps} from './Spacer.types'

/**
 * Spacer
 * Flexible spacing component that fills available space with optional padding size.
 *
 * @param props - Component props with optional size from theme
 * @returns Spacer component
 */
export const Spacer = ({size, testID}: SpacerProps): React.JSX.Element => {
  return (
    <Box
      flex={1}
      padding={size}
      testID={`${testID}Box`}
    />
  )
}
