import React from 'react'

import {Box} from './Box'

/**
 * Spacer
 * TODO: describe what it does.
 *
 * @param {*} options
 * @returns {*} describe return value
 */
export const Spacer = ({size = 8}) => (
  <Box style={{width: size, height: size}} />
)
