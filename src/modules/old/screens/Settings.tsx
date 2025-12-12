import type React from 'react'

import {Box} from '@/shared/components/ui/layout/Box'
import {Text} from '@/shared/components/ui/typography'

/**
 * Settings
 * Application settings screen (stub implementation).
 *
 * @returns Settings screen component
 */
export const Settings = (): React.JSX.Element => {
  return (
    <Box
      flex={1}
      center>
      <Text.Title>Settings Screen</Text.Title>
    </Box>
  )
}
