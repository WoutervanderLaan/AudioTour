import React, {type ReactNode} from 'react'

import {Box, BoxProps} from './Box'

/**
 * Row
 * Layout component that renders children in a horizontal row using flexbox direction.
 *
 * @param {*} props
 * @returns {*} Row layout component
 */
export const Row = (props: Omit<BoxProps, 'row' | 'column'>): ReactNode => {
  const boxProps = {...props, row: true} as BoxProps

  return <Box {...boxProps} />
}
