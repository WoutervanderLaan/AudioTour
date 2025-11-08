import React from 'react'

import {Box, BoxProps} from './Box'

/**
 * Container
 * TODO: describe what it does.
 *
 * @param {*} options
 * @returns {*} describe return value
 */
export const Container: React.FC<BoxProps> = ({padding = 16, ...rest}) => {
  return (
    <Box
      padding={padding}
      style={[{flex: 1}, rest.style]}
      {...rest}
    />
  )
}
