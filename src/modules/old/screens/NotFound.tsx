import type React from 'react'

import {Text} from '@react-navigation/elements'

import {Box} from '@/shared/components/ui/layout/Box'

/**
 * NotFound
 * 404 error screen displayed when a user navigates to an invalid route.
 *
 * @returns Not found error screen component
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
