import type React from 'react'

import {Text} from '@react-navigation/elements'

import {Box} from '@/shared/components/ui/layout/Box'

/**
 * NotFound
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const NotFound = (): React.JSX.Element => {
  return (
    <Box
      flex={1}
      center>
      <Text>404</Text>
      {/* <Button screen="HomeTabs">Go to Home</Button> */}
    </Box>
  )
}
