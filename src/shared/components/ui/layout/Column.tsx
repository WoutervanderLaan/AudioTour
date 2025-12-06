import React, {type ReactNode} from 'react'

import {Box, BoxProps} from './Box'

/**
 * Column
 * Layout component that renders children in a vertical column using flexbox direction.
 *
 * @param props - Box props excluding row and column since column direction is enforced
 * @returns Column layout component
 */
export const Column = (props: Omit<BoxProps, 'row' | 'column'>): ReactNode => {
  const boxProps = {...props, column: true} as BoxProps

  return <Box {...boxProps} />
}
