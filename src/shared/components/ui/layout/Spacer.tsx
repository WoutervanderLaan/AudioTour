import React from 'react'

import {Box} from './Box'

import type {Theme} from '@/themes/types'

/**
 * Spacer
 * Flexible spacing component that fills available space with optional padding size.
 *
 * @param props - Component props with optional size from theme
 * @returns Spacer component
 */
export const Spacer = ({
  size,
}: {
  size?: keyof Theme['size']
}): React.JSX.Element => {
  return (
    <Box
      flex={1}
      padding={size}
    />
  )
}
