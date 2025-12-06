import type React from 'react'

import {Text} from '@react-navigation/elements'

import {Box} from '@/shared/components/ui/layout/Box'

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
      <Text>Settings Screen</Text>
    </Box>
  )
}
