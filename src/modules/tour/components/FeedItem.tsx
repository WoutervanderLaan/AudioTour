import React from 'react'
import {ActivityIndicator} from 'react-native'

import {MAX_PHOTOS} from '../constants'
import {getFeedItemStatusText} from '../utils/getFeedItemStatusText'

import type {FeedItem as FeedItemType} from '@/modules/tour/types'
import {AudioPlayer} from '@/shared/components/features/audio-player/AudioPlayer'
import {Thumbnail} from '@/shared/components/features/thumbnail/Thumbnail'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {PressableBase} from '@/shared/components/ui/pressable/PressableBase'
import {Text} from '@/shared/components/ui/typography'

/**
 * FeedItemProps
 * Props for the FeedItem component
 */
type FeedItemProps = {
  /**
   * The feed item data to display
   */
  item: FeedItemType
  /**
   * Callback when item is pressed to view details
   */
  onPress: () => void
  /**
   * Test ID for the component
   */
  testId?: string
}

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
  testId = 'FeedItem',
}: FeedItemProps): React.JSX.Element => {
  const isLoading = !['ready', 'error'].includes(item.status)
  const showAudio = item.status === 'ready' && item.audioUrl

  return (
    <PressableBase
      onPress={onPress}
      testId={`${testId}Pressable`}>
      <Column
        gap="sm"
        padding="md"
        testId={`${testId}ContainerView`}>
        {item.photos.length > 0 && (
          <Row
            gap="xs"
            wrap="wrap"
            testId={`${testId}PhotosView`}>
            {item.photos.slice(0, MAX_PHOTOS).map((photo, index) => (
              <Thumbnail
                key={`photo-${index + 1}`}
                source={{uri: photo}}
                resizeMode="cover"
                testId={`${testId}Photo${index + 1}Thumbnail`}
              />
            ))}
            {item.photos.length > MAX_PHOTOS && (
              <Box testId={`${testId}MorePhotosView`}>
                <Text.Label
                  color="secondary"
                  testId={`${testId}MorePhotosText`}>
                  +{item.photos.length - MAX_PHOTOS}
                </Text.Label>
              </Box>
            )}
          </Row>
        )}

        {!!item.metadata?.title && (
          <Text.Paragraph
            numberOfLines={2}
            testId={`${testId}TitleText`}>
            {item.metadata.title}
          </Text.Paragraph>
        )}

        {!!item.metadata?.artist && (
          <Text.Label
            numberOfLines={1}
            testId={`${testId}ArtistText`}>
            {item.metadata.artist}
          </Text.Label>
        )}

        {!!isLoading && (
          <Row
            gap="sm"
            center
            testId={`${testId}LoadingView`}>
            <ActivityIndicator size="small" />
            <Text.Label testId={`${testId}LoadingText`}>
              {getFeedItemStatusText(item.status)}
            </Text.Label>
          </Row>
        )}

        {item.status === 'error' && (
          <Text.Label
            color="warning"
            testId={`${testId}ErrorText`}>
            {item.error || 'An error occurred'}
          </Text.Label>
        )}

        {!!item.narrativeText && (
          <Text.Paragraph
            numberOfLines={3}
            testId={`${testId}NarrativeText`}>
            {item.narrativeText}
          </Text.Paragraph>
        )}

        {Boolean(showAudio) && (
          <AudioPlayer
            src={item.audioUrl!}
            testId={`${testId}AudioPlayer`} />
        )}
      </Column>
    </PressableBase>
  )
}
