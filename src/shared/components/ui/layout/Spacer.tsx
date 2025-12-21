import React from 'react'

import {Box} from './Box'

import type {Theme} from '@/themes/types'

/**
 * SpacerProps
 * Props for the Spacer component
 */
type SpacerProps = {
  /** Optional padding size from theme */
  size?: keyof Theme['size']
  /** Test identifier for automated testing */
  testID?: string
}

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
      testID={testID}
    />
  )
}
