import React, {type ReactNode} from 'react'

import {Box, BoxProps} from './Box'

import type {TestProps} from '@/shared/types/TestProps'

/**
 * Row
 * Layout component that renders children in a horizontal row using flexbox direction.
 *
 * @param props - Box props excluding row and column since row direction is enforced
 * @returns Row layout component
 */
export const Row = (
  props: Omit<BoxProps, 'row' | 'column' | 'testID'> &
    TestProps<'Row' | 'Container'>,
): ReactNode => {
  const boxProps = {
    ...props,
    testID: `${props.testID}Box`,
    row: true,
  } as BoxProps

  return <Box {...boxProps} />
}
