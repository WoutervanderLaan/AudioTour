import type React from 'react'
import {Image} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import type {PersistedTour} from '../types'

import {datetime} from '@/core/lib/datetime'
import {Box} from '@/shared/components/ui/layout/Box/Box'
import {Column} from '@/shared/components/ui/layout/Column/Column'
import {Row} from '@/shared/components/ui/layout/Row/Row'
import {Text} from '@/shared/components/ui/typography/Text'

/**
 * HistoryDetailHeader
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export const HistoryDetailHeader = ({
  tour,
}: {
  tour: PersistedTour
}): React.JSX.Element => {
  const formattedDate = datetime(tour.createdAt).format('MMMM D, YYYY')
  const artworkLabel = `${tour.feedItems.length} Artwork${tour.feedItems.length === 1 ? '' : 's'}`

  return (
    <Column
      paddingBottom="md"
      gap="md"
      testID="HistoryDetailScreenHeaderColumn">
      <Box testID="HistoryDetailScreenHeroImageBox">
        <Image
          source={{uri: tour.heroImageUri}}
          style={styles.heroImage}
          testID="HistoryDetailScreenHeroImage"
        />
      </Box>

      <Column
        paddingH="md"
        gap="md"
        testID="HistoryDetailScreenHeaderInnerColumn">
        <Column testID="HistoryDetailScreenHeadeTitleColumn">
          <Text.Title
            level="h3"
            testID="HistoryDetailScreenTitleText">
            {tour.title}
          </Text.Title>
          <Row
            gap="xs"
            testID="HistoryDetailScreenMetaRow">
            <Text.Paragraph
              variant="small"
              testID="HistoryDetailScreenMuseumNameText">
              {tour.museumName}
            </Text.Paragraph>
            <Text.Paragraph
              variant="small"
              testID="HistoryDetailScreenDotText">
              ·
            </Text.Paragraph>
            <Text.Paragraph
              variant="small"
              testID="HistoryDetailScreenDateText">
              {formattedDate}
            </Text.Paragraph>
          </Row>
        </Column>

        {!!tour.description.length && (
          <Text.Paragraph testID="HistoryDetailScreenDescriptionText">
            {tour.description}
          </Text.Paragraph>
        )}

        <Text.Label testID="HistoryDetailScreenArtworksLabelText">
          {artworkLabel}
        </Text.Label>
      </Column>
    </Column>
  )
}

const styles = StyleSheet.create(theme => ({
  heroImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: theme.color.screen.background.settings,
  },
}))
