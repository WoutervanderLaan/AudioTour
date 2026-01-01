import React from 'react'

import {Box} from '@/shared/components/ui/layout/Box/Box'
import {Screen} from '@/shared/components/ui/screen/Screen'
import {Text} from '@/shared/components/ui/typography/Text'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * ObjectNotFoundProps
 * Props for the ObjectNotFound component
 */
type ObjectNotFoundProps = TestProps<'ObjectNotFound'>

/**
 * ObjectNotFound
 * Displays a message when an object is not found
 *
 * @param props - Component props
 * @returns Object not found screen
 */
export const ObjectNotFound = ({
  testID,
}: ObjectNotFoundProps): React.JSX.Element => {
  return (
    <Screen.Static testID={`${testID}Screen`}>
      <Box
        flex={1}
        center
        testID={`${testID}Container`}>
        <Text.Paragraph testID={`${testID}MessageText`}>
          Object not found
        </Text.Paragraph>
      </Box>
    </Screen.Static>
  )
}
