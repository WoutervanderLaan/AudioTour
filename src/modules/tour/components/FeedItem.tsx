import React from 'react'
import {ActivityIndicator} from 'react-native'

import {getFeedItemStatusText} from '../utils/getFeedItemStatusText'

import {AudioPlayer} from '@/shared/components/features/audio-player/AudioPlayer'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {PressableBase} from '@/shared/components/ui/pressable/PressableBase'
import {Thumbnail} from '@/shared/components/ui/thumbnail/Thumbnail'
import {Text} from '@/shared/components/ui/typography'
import type {FeedItem as FeedItemType} from '@/modules/tour/store/useTourStore'

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
}

const MAX_PHOTOS = 4

/**
 * FeedItem
 * Component that displays a single tour item in the feed.
 * Shows photos, loading states, metadata, and audio player when ready.
 *
 * @param props - Component props
 * @returns Feed item component
 */
export const FeedItem = ({item, onPress}: FeedItemProps): React.JSX.Element => {
  const isLoading = !['ready', 'error'].includes(item.status)
  const showAudio = item.status === 'ready' && item.audioUrl

  return (
    <PressableBase onPress={onPress}>
      <Column
        gap="sm"
        padding="md">
        {item.photos.length > 0 && (
          <Row
            gap="xs"
            wrap="wrap">
            {item.photos.slice(0, MAX_PHOTOS).map((photo, index) => (
              <Thumbnail
                key={`photo-${index + 1}`}
                source={{uri: photo}}
                resizeMode="cover"
              />
            ))}
            {item.photos.length > MAX_PHOTOS && (
              <Box>
                <Text.Label color="secondary">
                  +{item.photos.length - MAX_PHOTOS}
                </Text.Label>
              </Box>
            )}
          </Row>
        )}

        {!!item.metadata?.title && (
          <Text.Paragraph numberOfLines={2}>
            {item.metadata.title}
          </Text.Paragraph>
        )}

        {!!item.metadata?.artist && (
          <Text.Label numberOfLines={1}>{item.metadata.artist}</Text.Label>
        )}

        {!!isLoading && (
          <Row
            gap="sm"
            center>
            <ActivityIndicator size="small" />
            <Text.Label>{getFeedItemStatusText(item.status)}</Text.Label>
          </Row>
        )}

        {item.status === 'error' && (
          <Text.Label color="warning">
            {item.error || 'An error occurred'}
          </Text.Label>
        )}

        {!!item.narrativeText && (
          <Text.Paragraph numberOfLines={3}>
            {item.narrativeText}
          </Text.Paragraph>
        )}

        {Boolean(showAudio) && <AudioPlayer src={item.audioUrl!} />}
      </Column>
    </PressableBase>
  )
}
