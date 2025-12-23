import React from 'react'

import {Box} from '@/shared/components/ui/layout/Box'
import {Screen} from '@/shared/components/ui/screen/Screen'
import {Text} from '@/shared/components/ui/typography'

/**
 * ObjectNotFound
 * Displays a message when an object is not found
 *
 * @returns Object not found screen
 */
export const ObjectNotFound = (): React.JSX.Element => {
  return (
    <Screen.Static>
      <Box
        flex={1}
        center>
        <Text.Paragraph>Object not found</Text.Paragraph>
      </Box>
    </Screen.Static>
  )
}
