import type React from 'react'

import {Column} from '@/shared/components/ui/layout/Column'
import {Screen} from '@/shared/components/ui/screen/Screen'
import {Text} from '@/shared/components/ui/typography/Text'

/**
 * HomeScreen
 * Placeholder landing screen for the template. Replace its contents with the
 * primary experience of your app. Serves as the default tab so the navigator
 * always has a resolvable initial route.
 *
 * @returns {React.JSX.Element} The home screen component
 */
export const HomeScreen = (): React.JSX.Element => (
  <Screen.Static testID="HomeScreen">
    <Column
      gap="md"
      center
      flex={1}
      padding="md"
      testID="HomeScreenContainer">
      <Text.Title testID="HomeScreenTitleText">Welcome</Text.Title>
      <Text.Paragraph testID="HomeScreenSubtitleText">
        This is a starter home screen. Replace it with your app.
      </Text.Paragraph>
    </Column>
  </Screen.Static>
)
