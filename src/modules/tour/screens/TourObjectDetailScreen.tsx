import React, {useState} from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import type {TourStackParams} from '../routes.types'

import {AudioPlayer} from '@/shared/components/features/audio-player/AudioPlayer'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'
import type {RouteProp} from '@/shared/types/navigation'
import {useTourStore} from '@/store/slices/tourStore'

/**
 * TourObjectDetailScreenProps
 * Props for the TourObjectDetailScreen
 */
type TourObjectDetailScreenProps = {
  /**
   * Navigation route prop
   */
  route: RouteProp<TourStackParams, 'TourObjectDetail'>
}

/**
 * TourObjectDetailScreen
 * Detailed view of a captured tour object.
 * Displays photo gallery, metadata, narrative text, and audio player.
 *
 * @param props - Component props
 * @returns Tour object detail screen component
 */
export const TourObjectDetailScreen = ({
  route,
}: TourObjectDetailScreenProps): React.JSX.Element => {
  const {feedItemId} = route.params
  const {width} = useWindowDimensions()

  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  const feedItem = useTourStore(state => state.getFeedItem(feedItemId))

  if (!feedItem) {
    return (
      <Screen.Default>
        <Box
          flex={1}
          center>
          <Text.Body>Object not found</Text.Body>
        </Box>
      </Screen.Default>
    )
  }

  const hasMultiplePhotos = feedItem.photos.length > 1

  return (
    <Screen.Default>
      <ScrollView>
        <Column gap="lg">
          {/* Photo Gallery */}
          {feedItem.photos.length > 0 && (
            <View>
              {/* Main Photo */}
              <Image
                source={{uri: feedItem.photos[activePhotoIndex]}}
                style={[styles.mainPhoto, {width, height: width}]}
                resizeMode="cover"
              />

              {/* Photo Indicators */}
              {hasMultiplePhotos && (
                <Row
                  gap="xs"
                  center
                  style={styles.photoIndicators}>
                  {feedItem.photos.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.indicator,
                        index === activePhotoIndex && styles.activeIndicator,
                      ]}
                    />
                  ))}
                </Row>
              )}

              {/* Thumbnail Strip */}
              {hasMultiplePhotos && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.thumbnailStrip}>
                  {feedItem.photos.map((photo, index) => (
                    <Image
                      key={index}
                      source={{uri: photo}}
                      style={[
                        styles.thumbnail,
                        index === activePhotoIndex &&
                          styles.activeThumbnail,
                      ]}
                      resizeMode="cover"
                      onTouchEnd={() => setActivePhotoIndex(index)}
                    />
                  ))}
                </ScrollView>
              )}
            </View>
          )}

          {/* Content */}
          <Box
            paddingH="md"
            paddingV="lg">
            <Column gap="lg">
              {/* Title and Artist */}
              {feedItem.metadata?.title && (
                <Text.H2>{feedItem.metadata.title}</Text.H2>
              )}

              {feedItem.metadata?.artist && (
                <Text.Body
                  weight="semibold"
                  style={styles.artist}>
                  {feedItem.metadata.artist}
                </Text.Body>
              )}

              {/* Year and Material */}
              {(feedItem.metadata?.year || feedItem.metadata?.material) && (
                <Row
                  gap="md"
                  flexWrap="wrap">
                  {feedItem.metadata?.year && (
                    <Text.Caption>{feedItem.metadata.year}</Text.Caption>
                  )}
                  {feedItem.metadata?.material && (
                    <Text.Caption>{feedItem.metadata.material}</Text.Caption>
                  )}
                </Row>
              )}

              {/* Description */}
              {feedItem.metadata?.description && (
                <Column gap="xs">
                  <Text.Label weight="semibold">Description</Text.Label>
                  <Text.Body style={styles.description}>
                    {feedItem.metadata.description}
                  </Text.Body>
                </Column>
              )}

              {/* Recognition Info */}
              {feedItem.recognitionConfidence !== undefined && (
                <Column gap="xs">
                  <Text.Label weight="semibold">Recognition</Text.Label>
                  <Text.Caption>
                    Confidence: {feedItem.recognitionConfidence.toFixed(1)}%
                  </Text.Caption>
                  {feedItem.objectId && (
                    <Text.Caption>Object ID: {feedItem.objectId}</Text.Caption>
                  )}
                </Column>
              )}

              {/* Narrative */}
              {feedItem.narrativeText && (
                <Column gap="xs">
                  <Text.Label weight="semibold">Narrative</Text.Label>
                  <Text.Body style={styles.narrative}>
                    {feedItem.narrativeText}
                  </Text.Body>
                </Column>
              )}

              {/* Audio Player */}
              {feedItem.audioUrl && (
                <Column gap="xs">
                  <Text.Label weight="semibold">Audio Tour</Text.Label>
                  <AudioPlayer src={feedItem.audioUrl} />
                </Column>
              )}

              {/* Status Info */}
              {feedItem.status !== 'ready' && (
                <Box style={styles.statusBox}>
                  <Text.Caption>
                    Status: {feedItem.status.replace(/_/g, ' ')}
                  </Text.Caption>
                </Box>
              )}

              {feedItem.error && (
                <Box style={styles.errorBox}>
                  <Text.Caption style={styles.errorText}>
                    Error: {feedItem.error}
                  </Text.Caption>
                </Box>
              )}
            </Column>
          </Box>
        </Column>
      </ScrollView>
    </Screen.Default>
  )
}

const styles = StyleSheet.create(theme => ({
  mainPhoto: {
    backgroundColor: theme.colors.surface.secondary,
  },
  photoIndicators: {
    position: 'absolute',
    bottom: theme.spacing.md,
    left: 0,
    right: 0,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.surface.secondary,
    opacity: 0.6,
  },
  activeIndicator: {
    backgroundColor: theme.colors.surface.primary,
    opacity: 1,
  },
  thumbnailStrip: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeThumbnail: {
    borderColor: theme.colors.border.accent,
  },
  artist: {
    color: theme.colors.text.secondary,
  },
  description: {
    color: theme.colors.text.secondary,
  },
  narrative: {
    color: theme.colors.text.secondary,
    fontStyle: 'italic',
  },
  statusBox: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surface.secondary,
    borderRadius: theme.borderRadius.sm,
  },
  errorBox: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surface.error,
    borderRadius: theme.borderRadius.sm,
  },
  errorText: {
    color: theme.colors.text.error,
  },
}))
