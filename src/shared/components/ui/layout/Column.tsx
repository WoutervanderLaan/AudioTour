import React, {type ReactNode} from 'react'

import {Box, BoxProps} from './Box'

import type {TestProps} from '@/shared/types/TestProps'

/**
 * Column
 * Layout component that renders children in a vertical column using flexbox direction.
 *
 * @param props - Box props excluding row and column since column direction is enforced
 * @returns Column layout component
 */
export const Column = (
  props: Omit<BoxProps, 'row' | 'column' | 'testID'> &
    TestProps<'Column' | 'Container'>,
): ReactNode => {
  const boxProps = {
    ...props,
    testID: `${props.testID}Box`,
    column: true,
  } as BoxProps

  return <Box {...boxProps} />
}
