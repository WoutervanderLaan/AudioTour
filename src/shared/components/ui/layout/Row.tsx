import React, {type ReactNode} from 'react'

import {Box, BoxProps} from './Box'

/**
 * Row
 * Layout component that renders children in a horizontal row using flexbox direction.
 *
 * @param props - Box props excluding row and column since row direction is enforced
 * @returns Row layout component
 */
export const Row = (props: Omit<BoxProps, 'row' | 'column'>): ReactNode => {
  const boxProps = {...props, row: true} as BoxProps

  return <Box {...boxProps} />
}
