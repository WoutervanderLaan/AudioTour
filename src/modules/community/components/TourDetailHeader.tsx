import React from 'react'
import {Image} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import type {CommunityTour} from '../types'
import {RatingDisplay} from './RatingDisplay'
import {RatingInput} from './RatingInput'

import {Box} from '@/shared/components/ui/layout/Box/Box'
import {Column} from '@/shared/components/ui/layout/Column/Column'
import {Row} from '@/shared/components/ui/layout/Row/Row'
import {Spacer} from '@/shared/components/ui/layout/Spacer/Spacer'
import {Button} from '@/shared/components/ui/pressable/Button/Button'
import {Text} from '@/shared/components/ui/typography/Text'
import type {TestProps} from '@/shared/types/TestProps'

/**
 * TourDetailHeaderProps
 * Props for the TourDetailHeader component.
 */
type TourDetailHeaderProps = TestProps<'TourDetailHeader'> & {
  /**
   * The tour to display
   */
  tour: CommunityTour
  /**
   * Callback when start tour is pressed
   */
  onStartTour: () => void
  /**
   * Callback when rating is submitted
   */
  onRated: () => void
}

/**
 * TourDetailHeader
 * Displays the header section of a tour detail screen including
 * hero image, metadata, rating, and action buttons.
 *
 * @param props - Component props
 * @returns Tour detail header component
 */
export const TourDetailHeader = ({
  tour,
  onStartTour,
  onRated,
  testID,
}: TourDetailHeaderProps): React.JSX.Element => (
  <Column
    gap="md"
    testID={`${testID}Column`}>
    <Image
      source={{uri: tour.heroImageUri}}
      style={styles.heroImage}
      resizeMode="cover"
      testID={`${testID}HeroImage`}
    />
    <TourMetaSection
      tour={tour}
      testID={testID}
    />
    <TourActions
      tour={tour}
      onStartTour={onStartTour}
      onRated={onRated}
      testID={testID}
    />
  </Column>
)

/**
 * TourMetaSectionProps
 * Props for the TourMetaSection component.
 */
type TourMetaSectionProps = TestProps<'TourDetailHeader'> & {
  tour: CommunityTour
}

/**
 * TourMetaSection
 * Displays tour title, museum, rating, author, and description.
 *
 * @param props - Component props
 * @returns Tour meta section component
 */
const TourMetaSection = ({
  tour,
  testID,
}: TourMetaSectionProps): React.JSX.Element => (
  <Column
    padding="md"
    gap="sm"
    testID={`${testID}MetaColumn`}>
    <Text.Title
      level="h2"
      testID={`${testID}TitleText`}>
      {tour.title}
    </Text.Title>
    <Text.Paragraph
      color="secondary"
      testID={`${testID}MuseumText`}>
      {tour.museumName}
    </Text.Paragraph>
    <RatingDisplay
      rating={tour.communityRating}
      count={tour.ratingCount}
      size="md"
      testID={`${testID}RatingDisplay`}
    />
    <Row
      gap="xs"
      alignItems="center"
      testID={`${testID}AuthorRow`}>
      <Text.Paragraph
        variant="small"
        color="secondary"
        testID={`${testID}ByText`}>
        By
      </Text.Paragraph>
      <Text.Paragraph
        variant="small"
        testID={`${testID}AuthorText`}>
        {tour.author.displayName}
      </Text.Paragraph>
      {tour.isOfficial === true && (
        <Text.Label testID={`${testID}OfficialText`}>Official</Text.Label>
      )}
    </Row>
    <Text.Paragraph
      color="secondary"
      testID={`${testID}DescriptionText`}>
      {tour.description}
    </Text.Paragraph>
    <TourStats
      tour={tour}
      testID={testID}
    />
  </Column>
)

/**
 * TourStatsProps
 * Props for the TourStats component.
 */
type TourStatsProps = TestProps<'TourDetailHeader'> & {
  tour: CommunityTour
}

/**
 * TourStats
 * Displays tour statistics and tags.
 *
 * @param props - Component props
 * @returns Tour stats component
 */
const TourStats = ({tour, testID}: TourStatsProps): React.JSX.Element => (
  <>
    <Row
      gap="sm"
      testID={`${testID}StatsRow`}>
      <Text.Paragraph
        variant="small"
        color="secondary"
        testID={`${testID}ArtworkCountText`}>
        {tour.feedItems.length} Artworks
      </Text.Paragraph>
      <Text.Paragraph
        variant="small"
        color="secondary"
        testID={`${testID}DotText`}>
        ·
      </Text.Paragraph>
      <Text.Paragraph
        variant="small"
        color="secondary"
        testID={`${testID}DownloadCountText`}>
        {tour.downloadCount} plays
      </Text.Paragraph>
    </Row>
    {tour.tags.length > 0 && (
      <Row
        gap="xs"
        wrap="wrap"
        testID={`${testID}TagsRow`}>
        {tour.tags.map(tag => (
          <Box
            key={tag}
            style={styles.tag}
            testID={`${testID}${tag}Box`}>
            <Text.Paragraph
              variant="extraSmall"
              color="secondary"
              testID={`${testID}${tag}Text`}>
              {tag}
            </Text.Paragraph>
          </Box>
        ))}
      </Row>
    )}
  </>
)

/**
 * TourActionsProps
 * Props for the TourActions component.
 */
type TourActionsProps = TestProps<'TourDetailHeader'> & {
  tour: CommunityTour
  onStartTour: () => void
  onRated: () => void
}

/**
 * TourActions
 * Displays action buttons and rating input.
 *
 * @param props - Component props
 * @returns Tour actions component
 */
const TourActions = ({
  tour,
  onStartTour,
  onRated,
  testID,
}: TourActionsProps): React.JSX.Element => (
  <Column
    padding="md"
    gap="sm"
    testID={`${testID}ActionsColumn`}>
    <Button
      label="Start Tour"
      onPress={onStartTour}
      testID={`${testID}StartTourButton`}
    />
    <Spacer
      size="sm"
      testID={`${testID}RatingSpacer`}
    />
    <Text.Label testID={`${testID}RateLabelText`}>Rate this tour</Text.Label>
    <RatingInput
      tourId={tour.id}
      onRated={onRated}
      testID={`${testID}RatingInput`}
    />
    <Spacer
      size="md"
      testID={`${testID}PreviewSpacer`}
    />
    <Text.Title
      level="h3"
      testID={`${testID}PreviewText`}>
      Tour Preview
    </Text.Title>
  </Column>
)

const styles = StyleSheet.create(theme => ({
  heroImage: {
    width: '100%',
    height: 250,
    backgroundColor: theme.color.screen.background.settings,
  },
  tag: {
    paddingHorizontal: theme.size.sm,
    paddingVertical: theme.size.xs,
    borderRadius: theme.size.sm,
    backgroundColor: theme.color.screen.background.settings,
  },
}))
