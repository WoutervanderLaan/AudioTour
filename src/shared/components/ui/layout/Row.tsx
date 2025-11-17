import React, {type ReactNode} from 'react'

import {Box, BoxProps} from './Box'

/**
 * Row
 * TODO: describe what it does.
 *
 * @param {*} props
 * @returns {*} describe return value
 */
export const Row = (props: Omit<BoxProps, 'row' | 'column'>): ReactNode => {
  const boxProps = {...props, row: true} as BoxProps

  return <Box {...boxProps} />
}
