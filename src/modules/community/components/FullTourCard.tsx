import React from 'react'
import {StyleSheet} from 'react-native-unistyles'

import type {FullTourCardProps, TourMetadataProps} from './FullTourCard.types'
import {RatingDisplay} from './RatingDisplay'

import {Thumbnail} from '@/shared/components/features/thumbnail/Thumbnail'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {PressableBase} from '@/shared/components/ui/pressable/PressableBase'
import {Text} from '@/shared/components/ui/typography/Text'

/**
 * formatDistance
 * Formats a distance in meters to a human-readable string.
 *
 * @param meters - Distance in meters
 * @returns Formatted distance string
 */
const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`
  }
  return `${(meters / 1000).toFixed(1)}km`
}

/**
 * FullTourCard
 * Full-size card component for displaying a community tour summary.
 *
 * @param props - Component props
 * @returns Full tour card component
 */
export const FullTourCard = ({
  tour,
  onPress,
  testID,
}: FullTourCardProps): React.JSX.Element => (
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
        <Row
          gap="xs"
          alignItems="center"
          testID={`${testID}TitleRow`}>
          <Text.Label
            numberOfLines={1}
            style={styles.title}
            testID={`${testID}TitleText`}>
            {tour.title}
          </Text.Label>
          {tour.isOfficial === true && (
            <Box
              style={styles.officialBadge}
              testID={`${testID}OfficialBox`}>
              <Text.Paragraph
                variant="extraSmall"
                color="link"
                testID={`${testID}OfficialText`}>
                Official
              </Text.Paragraph>
            </Box>
          )}
        </Row>
        <Text.Paragraph
          variant="small"
          numberOfLines={1}
          testID={`${testID}MuseumNameText`}>
          {tour.museumName}
        </Text.Paragraph>
        <Text.Paragraph
          variant="extraSmall"
          color="secondary"
          testID={`${testID}ByText`}>
          By {tour.author.displayName}
        </Text.Paragraph>
        <RatingDisplay
          rating={tour.communityRating}
          count={tour.ratingCount}
          size="sm"
          testID={`${testID}RatingDisplay`}
        />
        <TourMetadata
          tour={tour}
          testID={testID}
        />
      </Column>
    </Row>
  </PressableBase>
)

/**
 * TourMetadata
 * Displays tour metadata including artwork count, plays, and distance.
 *
 * @param props - Component props
 * @returns Tour metadata component
 */
const TourMetadata = ({tour, testID}: TourMetadataProps): React.JSX.Element => (
  <>
    <Row
      gap="xs"
      testID={`${testID}MetaRow`}>
      <Text.Paragraph
        variant="extraSmall"
        color="secondary"
        testID={`${testID}ArtworkCountText`}>
        {tour.artworkCount} artworks
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
        testID={`${testID}DownloadCountText`}>
        {tour.downloadCount} plays
      </Text.Paragraph>
      {tour.distanceMeters !== undefined && (
        <>
          <Text.Paragraph
            variant="extraSmall"
            color="secondary"
            testID={`${testID}Dot2Text`}>
            ·
          </Text.Paragraph>
          <Text.Paragraph
            variant="extraSmall"
            color="secondary"
            testID={`${testID}DistanceText`}>
            {formatDistance(tour.distanceMeters)}
          </Text.Paragraph>
        </>
      )}
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
  </>
)

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.color.screen.background.default,
    borderRadius: theme.size.md,
    ...theme.styles.shadow.sm,
  },
  title: {
    flex: 1,
  },
  officialBadge: {
    paddingHorizontal: theme.size.xs,
    paddingVertical: 2,
    borderRadius: theme.size.xs,
    backgroundColor: theme.color.screen.background.settings,
  },
}))
