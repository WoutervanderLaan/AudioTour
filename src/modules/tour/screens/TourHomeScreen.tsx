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
    <Screen.Static testID="TourHomeScreen">
      <Box
        flex={1}
        center
        paddingH="lg"
        testID="TourHomeScreenContainerBox">
        <Column
          gap="xl"
          center
          testID="TourHomeScreenContentColumn">
          <Column
            gap="md"
            center
            testID="TourHomeScreenHeaderColumn">
            <Text.Title testID="TourHomeScreenTitleText">AudioTour</Text.Title>
            <Text.Paragraph
              align="center"
              testID="TourHomeScreenDescriptionText">
              Discover museum treasures with personalized audio narratives
            </Text.Paragraph>
          </Column>

          <Button
            label="Start new tour"
            onPress={() => navigate(TourRouteName.feed, {})}
            testID="TourHomeScreenStartButton"
          />
        </Column>
      </Box>
    </Screen.Static>
  )
}
