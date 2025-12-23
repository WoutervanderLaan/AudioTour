import React from 'react'

import {TourRouteName} from '../routes.types'

import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Button} from '@/shared/components/ui/pressable/Button'
import {Screen} from '@/shared/components/ui/screen/Screen'
import {Text} from '@/shared/components/ui/typography'
import {useNavigation} from '@/shared/hooks/useNavigation'

/**
 * TourHomeScreen
 * Landing screen for starting a new audio tour.
 * Displays app title and call-to-action to begin a tour session.
 *
 * @returns Tour home screen component
 */
export const TourHomeScreen = (): React.JSX.Element => {
  const {navigate} = useNavigation()

  return (
    <Screen.Static>
      <Box
        flex={1}
        center
        paddingH="lg">
        <Column
          gap="xl"
          center>
          <Column
            gap="md"
            center>
            <Text.Title>AudioTour</Text.Title>
            <Text.Paragraph align="center">
              Discover museum treasures with personalized audio narratives
            </Text.Paragraph>
          </Column>

          <Button
            label="Start new tour"
            onPress={() => navigate(TourRouteName.feed, {})}
          />
        </Column>
      </Box>
    </Screen.Static>
  )
}
