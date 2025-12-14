import React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import {TourRouteName} from '../routes.types'

import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Button} from '@/shared/components/ui/pressable'
import {Screen} from '@/shared/components/ui/screen'
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

  /**
   * handleStartTour
   * Navigates to the tour feed screen to begin a new tour session.
   *
   * @returns void
   */
  const handleStartTour = (): void => {
    navigate(TourRouteName.feed)
  }

  return (
    <Screen.Default>
      <Box
        flex={1}
        center
        paddingH="lg"
        paddingV="xl">
        <Column
          gap="xl"
          center>
          <Column
            gap="md"
            center>
            <Text.H1 style={styles.title}>AudioTour</Text.H1>
            <Text.Body style={styles.callToAction}>
              Discover museum treasures with AI-powered audio narratives
            </Text.Body>
          </Column>

          <Button
            label="Start new tour"
            onPress={handleStartTour}
            size="large"
          />
        </Column>
      </Box>
    </Screen.Default>
  )
}

const styles = StyleSheet.create(theme => ({
  title: {
    textAlign: 'center',
    color: theme.colors.text.primary,
  },
  callToAction: {
    textAlign: 'center',
    color: theme.colors.text.secondary,
    maxWidth: 300,
  },
}))
