import React from 'react'

import {Box, BoxProps} from './Box'

/**
 * Row
 * TODO: describe what it does.
 *
 * @param {*} props
 * @returns {*} describe return value
 */
export const Row: React.FC<Omit<BoxProps, 'row' | 'column'>> = props => {
  return (
    <Box
      {...props}
      row
    />
  )
}
