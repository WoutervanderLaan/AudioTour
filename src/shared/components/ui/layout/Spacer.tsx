import React from 'react'

import type {Theme} from '@/themes/types'

import {Box} from './Box'

/**
 * Spacer
 * TODO: describe what it does.
 *
 * @param {*} options
 * @returns {*} describe return value
 */
export const Spacer = ({size}: {size?: keyof Theme['size']}) => {
  return (
    <Box
      flex={1}
      padding={size}
    />
  )
}
