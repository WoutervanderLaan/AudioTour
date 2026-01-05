import React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import type {HistoryTourCardProps} from './HistoryTourCard.types'

import {datetime} from '@/core/lib/datetime'
import {Thumbnail} from '@/shared/components/features/thumbnail/Thumbnail'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {PressableBase} from '@/shared/components/ui/pressable/PressableBase'
import {Text} from '@/shared/components/ui/typography/Text'

/**
 * HistoryTourCard
 * Card component for displaying a tour summary in the history list.
 * Shows hero image, title, museum name, date, and artwork count.
 *
 * @param props - Component props
 * @returns Tour card component
 */
export const HistoryTourCard = ({
  tour,
  onPress,
  testID,
}: HistoryTourCardProps): React.JSX.Element => {
  const formattedDate = datetime(tour.createdAt).format('MMM D, YYYY')

  return (
    <PressableBase
      onPress={onPress}
      testID={`${testID}Pressable`}
      style={() => [styles.container]}>
      <Row
        padding="md"
        gap="md"
        testID={`${testID}ContentRow`}>
        <Thumbnail
          source={{uri: tour.heroImageUri}}
          testID={`${testID}Thumbnail`}
        />

        <Column
          flex={1}
          gap="xs"
          testID={`${testID}TextColumn`}>
          <Text.Label
            numberOfLines={1}
            testID={`${testID}TitleText`}>
            {tour.title}
          </Text.Label>

          <Text.Paragraph
            variant="small"
            numberOfLines={1}
            testID={`${testID}MuseumNameText`}>
            {tour.museumName}
          </Text.Paragraph>

          <Row
            gap="xs"
            testID={`${testID}MetaRow`}>
            <Text.Paragraph
              variant="extraSmall"
              color="secondary"
              testID={`${testID}DateText`}>
              {formattedDate}
            </Text.Paragraph>
            <Text.Paragraph
              variant="extraSmall"
              color="secondary"
              testID={`${testID}DotText`}>
              ·
            </Text.Paragraph>
            <Text.Paragraph
              variant="extraSmall"
              color="secondary"
              testID={`${testID}ArtworkCountText`}>
              {`${tour.artworkCount} artwork${tour.artworkCount === 1 ? '' : 's'}`}
            </Text.Paragraph>
          </Row>

          {tour.description.length > 0 && (
            <Text.Paragraph
              variant="extraSmall"
              numberOfLines={2}
              color="secondary"
              testID={`${testID}DescriptionText`}>
              {tour.description}
            </Text.Paragraph>
          )}
        </Column>
      </Row>
    </PressableBase>
  )
}

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.color.screen.background.default,
    borderRadius: theme.size.md,
    ...theme.styles.shadow.sm,
  },
}))
