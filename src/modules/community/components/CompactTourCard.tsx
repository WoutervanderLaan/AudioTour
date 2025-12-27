import React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import type {CommunityTourSummary} from '../types'
import {RatingDisplay} from './RatingDisplay'

import {Thumbnail} from '@/shared/components/features/thumbnail/Thumbnail'
import {Column} from '@/shared/components/ui/layout/Column'
import {PressableBase} from '@/shared/components/ui/pressable/PressableBase'
import {Text} from '@/shared/components/ui/typography/Text'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * CompactTourCardProps
 * Props for the CompactTourCard component.
 */
type CompactTourCardProps = TestProps<'CommunityTourCard'> & {
  /**
   * Community tour summary data to display
   */
  tour: CommunityTourSummary
  /**
   * Callback when the card is pressed
   */
  onPress: () => void
}

/**
 * CompactTourCard
 * Compact card component for horizontal scrolling tour lists.
 *
 * @param props - Component props
 * @returns Compact tour card component
 */
export const CompactTourCard = ({
  tour,
  onPress,
  testID,
}: CompactTourCardProps): React.JSX.Element => (
  <PressableBase
    onPress={onPress}
    testID={`${testID}Pressable`}
    style={() => [styles.compactContainer]}>
    <Column
      gap="xs"
      testID={`${testID}CompactColumn`}>
      <Thumbnail
        source={{uri: tour.heroImageUri}}
        size="lg"
        testID={`${testID}CompactThumbnail`}
      />
      <Text.Label
        numberOfLines={1}
        testID={`${testID}CompactTitleText`}>
        {tour.title}
      </Text.Label>
      <Text.Paragraph
        variant="extraSmall"
        numberOfLines={1}
        color="secondary"
        testID={`${testID}CompactMuseumText`}>
        {tour.museumName}
      </Text.Paragraph>
      <RatingDisplay
        rating={tour.communityRating}
        size="sm"
        showValue={false}
        testID={`${testID}CompactRatingDisplay`}
      />
    </Column>
  </PressableBase>
)

const styles = StyleSheet.create(() => ({
  compactContainer: {
    width: 140,
  },
}))
