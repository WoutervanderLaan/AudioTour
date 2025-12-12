import type React from 'react'

import {Column} from '@/shared/components/ui/layout/Column'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'

/**
 * ProfileScreen
 * Displays the user profile information and settings.
 * Currently shows a placeholder title while the full implementation is pending.
 *
 * @returns {React.JSX.Element} The profile screen component
 */
export const ProfileScreen = (): React.JSX.Element => {
  return (
    <Screen.Static>
      <Column
        gap="md"
        center
        flex={1}
        padding="md">
        <Text.Title>Profile</Text.Title>
      </Column>
    </Screen.Static>
  )
}
