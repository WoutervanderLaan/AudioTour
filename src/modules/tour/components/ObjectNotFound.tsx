import React from 'react'

import {Box} from '@/shared/components/ui/layout/Box'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'

/**
 * ObjectNotFoundProps
 * Props for the ObjectNotFound component
 */
type ObjectNotFoundProps = {
  /**
   * Test ID for the component
   */
  testId?: string
}

/**
 * ObjectNotFound
 * Displays a message when an object is not found
 *
 * @param props - Component props
 * @returns Object not found screen
 */
export const ObjectNotFound = ({
  testId = 'ObjectNotFound',
}: ObjectNotFoundProps): React.JSX.Element => {
  return (
    <Screen.Static testId={`${testId}Screen`}>
      <Box
        flex={1}
        center
        testId={`${testId}ContainerView`}>
        <Text.Paragraph testId={`${testId}MessageText`}>
          Object not found
        </Text.Paragraph>
      </Box>
    </Screen.Static>
  )
}
