import React, {type ReactNode} from 'react'

import {Box, BoxProps} from './Box'

/**
 * Column
 * TODO: describe what it does.
 *
 * @param {*} props
 * @returns {*} describe return value
 */
export const Column = (props: Omit<BoxProps, 'row' | 'column'>): ReactNode => {
  const boxProps = {...props, column: true} as BoxProps

  return <Box {...boxProps} />
}
