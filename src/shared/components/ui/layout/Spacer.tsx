import React from 'react'

import {Box} from './Box'

import type {Theme} from '@/themes/types'

/**
 * Spacer
 * TODO: describe what it does.
 *
 * @param {*} options
 * @returns {*} describe return value
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
