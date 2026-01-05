import React from 'react'
import {ActivityIndicator} from 'react-native'

import {MAX_PHOTOS} from '../constants'
import {getFeedItemStatusText} from '../utils/getFeedItemStatusText'
import type {FeedItemProps} from './FeedItem.types'

import {AudioPlayer} from '@/shared/components/features/audio-player/AudioPlayer'
import {Thumbnail} from '@/shared/components/features/thumbnail/Thumbnail'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {PressableBase} from '@/shared/components/ui/pressable/PressableBase'
import {Text} from '@/shared/components/ui/typography/Text'

/**
 * FeedItem
 * Component that displays a single tour item in the feed.
 * Shows photos, loading states, metadata, and audio player when ready.
 *
 * @param props - Component props
 * @returns Feed item component
 */
export const FeedItem = ({
  item,
  onPress,
  testID = 'FeedItem',
}: FeedItemProps): React.JSX.Element => {
  const isLoading = !['ready', 'error'].includes(item.status)
  const showAudio = item.status === 'ready' && item.audioUrl

  return (
    <PressableBase
      onPress={onPress}
      testID={`${testID}Pressable`}>
      <Column
        gap="sm"
        padding="md"
        testID={`${testID}Container`}>
        {item.photos.length > 0 && (
          <Row
            gap="xs"
            wrap="wrap"
            testID={`${testID}PhotosRow`}>
            {item.photos.slice(0, MAX_PHOTOS).map((photo, index) => (
              <Thumbnail
                key={`photo-${index + 1}`}
                source={{uri: photo}}
                resizeMode="cover"
                testID={`${testID}Photo${index + 1}Thumbnail`}
              />
            ))}
            {item.photos.length > MAX_PHOTOS && (
              <Box testID={`${testID}MorePhotosBox`}>
                <Text.Label
                  color="secondary"
                  testID={`${testID}MorePhotosText`}>
                  +{item.photos.length - MAX_PHOTOS}
                </Text.Label>
              </Box>
            )}
          </Row>
        )}

        {!!item.metadata?.title && (
          <Text.Paragraph
            numberOfLines={2}
            testID={`${testID}TitleText`}>
            {item.metadata.title}
          </Text.Paragraph>
        )}

        {!!item.metadata?.artist && (
          <Text.Label
            numberOfLines={1}
            testID={`${testID}ArtistText`}>
            {item.metadata.artist}
          </Text.Label>
        )}

        {!!isLoading && (
          <Row
            gap="sm"
            center
            testID={`${testID}LoadingRow`}>
            <ActivityIndicator size="small" />
            <Text.Label testID={`${testID}LoadingText`}>
              {getFeedItemStatusText(item.status)}
            </Text.Label>
          </Row>
        )}

        {item.status === 'error' && (
          <Text.Label
            color="warning"
            testID={`${testID}ErrorText`}>
            {item.error || 'An error occurred'}
          </Text.Label>
        )}

        {!!item.narrativeText && (
          <Text.Paragraph
            numberOfLines={3}
            testID={`${testID}NarrativeText`}>
            {item.narrativeText}
          </Text.Paragraph>
        )}

        {Boolean(showAudio) && (
          <AudioPlayer
            src={item.audioUrl!}
            testID={`${testID}AudioPlayer`}
          />
        )}
      </Column>
    </PressableBase>
  )
}
