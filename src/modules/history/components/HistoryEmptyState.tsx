import React, {useCallback} from 'react'
import {useUnistyles} from 'react-native-unistyles'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import {TourTabName} from '@/modules/tour/routes.types'
import {Box} from '@/shared/components/ui/layout/Box/Box'
import {Column} from '@/shared/components/ui/layout/Column/Column'
import {Spacer} from '@/shared/components/ui/layout/Spacer/Spacer'
import {Button} from '@/shared/components/ui/pressable/Button/Button'
import {Text} from '@/shared/components/ui/typography/Text'
import {useNavigation} from '@/shared/hooks/useNavigation'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * HistoryEmptyStateProps
 * Props for the HistoryEmptyState component.
 */
type HistoryEmptyStateProps = TestProps<'HistoryEmptyState'>

/**
 * HistoryEmptyState
 * Empty state component displayed when the user has no saved tours.
 * Shows a friendly message and a CTA to start a new tour.
 *
 * @param props - Component props
 * @returns Empty state component
 */
export const HistoryEmptyState = ({
  testID,
}: HistoryEmptyStateProps): React.JSX.Element => {
  const {theme} = useUnistyles()
  const {navigate} = useNavigation()

  /**
   * handleStartTour
   * Navigates to the Tour tab to start a new tour.
   */
  const handleStartTour = useCallback((): void => {
    navigate(TourTabName.home)
  }, [navigate])

  return (
    <Box
      flex={1}
      center
      padding="xl"
      testID={`${testID}Box`}>
      <Column
        center
        gap="md"
        testID={`${testID}ContentColumn`}>
        <MaterialIcons
          name="museum"
          size={64}
          color={theme.color.text.secondary}
          testID={`${testID}Icon`}
        />

        <Spacer
          size="sm"
          testID={`${testID}TopSpacer`}
        />

        <Text.Title
          level="h3"
          align="center"
          testID={`${testID}TitleText`}>
          No Tours Yet
        </Text.Title>

        <Text.Paragraph
          align="center"
          color="secondary"
          testID={`${testID}DescriptionText`}>
          Start exploring museums and create your first audio tour!
        </Text.Paragraph>

        <Spacer
          size="md"
          testID={`${testID}BottomSpacer`}
        />

        <Button
          label="Start a Tour"
          onPress={handleStartTour}
          testID={`${testID}StartTourButton`}
        />
      </Column>
    </Box>
  )
}
