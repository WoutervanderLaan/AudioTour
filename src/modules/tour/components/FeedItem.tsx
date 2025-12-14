import React from 'react'
import {ActivityIndicator, Image, Pressable, View} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import type {FeedItem as FeedItemType} from '@/store/slices/tourStore'

import {AudioPlayer} from '@/shared/components/features/audio-player/AudioPlayer'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
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
}

/**
 * getStatusText
 * Returns human-readable status text for a feed item status
 *
 * @param status - Feed item status
 * @returns Status text to display
 */
const getStatusText = (status: FeedItemType['status']): string => {
  switch (status) {
    case 'uploading':
      return 'Uploading photos...'
    case 'processing':
      return 'Processing...'
    case 'generating_narrative':
      return 'Generating narrative...'
    case 'generating_audio':
      return 'Generating audio...'
    case 'ready':
      return 'Ready'
    case 'error':
      return 'Error occurred'
    default:
      return 'Processing...'
  }
}

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
    <Pressable
      onPress={onPress}
      style={styles.container}>
      <Column gap="sm">
        {/* Photo Grid */}
        {item.photos.length > 0 && (
          <Row
            gap="xs"
            flexWrap="wrap">
            {item.photos.slice(0, 4).map((photo, index) => (
              <Image
                key={index}
                source={{uri: photo}}
                style={styles.photo}
                resizeMode="cover"
              />
            ))}
            {item.photos.length > 4 && (
              <View style={styles.morePhotos}>
                <Text.Label style={styles.morePhotosText}>
                  +{item.photos.length - 4}
                </Text.Label>
              </View>
            )}
          </Row>
        )}

        {/* Metadata if available */}
        {item.metadata?.title && (
          <Text.Body
            weight="semibold"
            numberOfLines={2}>
            {item.metadata.title}
          </Text.Body>
        )}

        {item.metadata?.artist && (
          <Text.Caption numberOfLines={1}>{item.metadata.artist}</Text.Caption>
        )}

        {/* Loading State */}
        {isLoading && (
          <Row
            gap="sm"
            alignItems="center">
            <ActivityIndicator size="small" />
            <Text.Caption>{getStatusText(item.status)}</Text.Caption>
          </Row>
        )}

        {/* Error State */}
        {item.status === 'error' && (
          <Text.Caption style={styles.errorText}>
            {item.error || 'An error occurred'}
          </Text.Caption>
        )}

        {/* Narrative Preview */}
        {item.narrativeText && (
          <Text.Body
            numberOfLines={3}
            style={styles.narrative}>
            {item.narrativeText}
          </Text.Body>
        )}

        {/* Audio Player */}
        {showAudio && <AudioPlayer src={item.audioUrl!} />}
      </Column>
    </Pressable>
  )
}

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.surface.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border.primary,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.sm,
  },
  morePhotos: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.surface.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  morePhotosText: {
    color: theme.colors.text.secondary,
  },
  errorText: {
    color: theme.colors.text.error,
  },
  narrative: {
    color: theme.colors.text.secondary,
    fontStyle: 'italic',
  },
}))
