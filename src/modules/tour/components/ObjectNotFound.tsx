import React from 'react'

import type {ObjectNotFoundProps} from './ObjectNotFound.types'

import {Box} from '@/shared/components/ui/layout/Box'
import {Screen} from '@/shared/components/ui/screen/Screen'
import {Text} from '@/shared/components/ui/typography/Text'

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
