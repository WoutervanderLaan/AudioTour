import type React from 'react'

import {Box} from '@/shared/components/ui/layout/Box'
import {Text} from '@/shared/components/ui/typography'

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
      <Text.Title>404</Text.Title>
      {/* <Button screen="HomeTabs">Go to Home</Button> */}
    </Box>
  )
}
