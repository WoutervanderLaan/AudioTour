/* eslint-disable max-lines-per-function */
import React, {useState} from 'react'
// eslint-disable-next-line no-restricted-imports
import {Image, ScrollView, useWindowDimensions, View} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import type {RouteProp} from '@react-navigation/native'

import type {TourRouteName, TourStackParams} from '../routes.types'

import {AudioPlayer} from '@/shared/components/features/audio-player/AudioPlayer'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {PressableBase} from '@/shared/components/ui/pressable/PressableBase'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'
import {useTourStore} from '@/modules/tour/store/useTourStore'

/**
 * TourObjectDetailScreenProps
 * Props for the TourObjectDetailScreen
 */
type TourObjectDetailScreenProps = {
  /**
   * Navigation route prop
   */
  route: RouteProp<TourStackParams, TourRouteName.objectDetail>
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
  // eslint-disable-next-line complexity
}: TourObjectDetailScreenProps): React.JSX.Element => {
  const {feedItemId} = route.params
  const {width} = useWindowDimensions()

  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  const feedItem = useTourStore(state => state.getFeedItem(feedItemId))

  if (!feedItem) {
    return (
      <Screen.Static>
        <Box
          flex={1}
          center>
          <Text.Paragraph>Object not found</Text.Paragraph>
        </Box>
      </Screen.Static>
    )
  }

  const hasMultiplePhotos = feedItem.photos.length > 1

  return (
    <Screen.Static>
      <ScrollView>
        <Column gap="lg">
          {feedItem.photos.length > 0 && (
            <View>
              <Image
                source={{uri: feedItem.photos[activePhotoIndex]}}
                style={[styles.mainPhoto, {width, height: width}]}
                resizeMode="cover"
              />

              {!!hasMultiplePhotos && (
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
              {!!hasMultiplePhotos && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.thumbnailStrip}>
                  {feedItem.photos.map((photo, index) => (
                    <PressableBase
                      key={index}
                      onTouchEnd={() => setActivePhotoIndex(index)}>
                      <Image
                        source={{uri: photo}}
                        style={[
                          styles.thumbnail,
                          index === activePhotoIndex && styles.activeThumbnail,
                        ]}
                        resizeMode="cover"
                      />
                    </PressableBase>
                  ))}
                </ScrollView>
              )}
            </View>
          )}

          <Box
            paddingH="md"
            paddingV="lg">
            <Column gap="lg">
              {!!feedItem.metadata?.title && (
                <Text.Title>{feedItem.metadata.title}</Text.Title>
              )}

              {!!feedItem.metadata?.artist && (
                <Text.Paragraph>{feedItem.metadata.artist}</Text.Paragraph>
              )}

              {!!(feedItem.metadata?.year || feedItem.metadata?.material) && (
                <Row
                  gap="md"
                  wrap="wrap">
                  {!!feedItem.metadata?.year && (
                    <Text.Label>{feedItem.metadata.year}</Text.Label>
                  )}
                  {!!feedItem.metadata?.material && (
                    <Text.Label>{feedItem.metadata.material}</Text.Label>
                  )}
                </Row>
              )}

              {!!feedItem.metadata?.description && (
                <Column gap="xs">
                  <Text.Label>Description</Text.Label>
                  <Text.Paragraph>
                    {feedItem.metadata.description}
                  </Text.Paragraph>
                </Column>
              )}

              {feedItem.recognitionConfidence !== undefined && (
                <Column gap="xs">
                  <Text.Label>Recognition</Text.Label>
                  <Text.Label>
                    Confidence: {feedItem.recognitionConfidence.toFixed(1)}%
                  </Text.Label>
                  {!!feedItem.objectId && (
                    <Text.Label>Object ID: {feedItem.objectId}</Text.Label>
                  )}
                </Column>
              )}

              {!!feedItem.narrativeText && (
                <Column gap="xs">
                  <Text.Label>Narrative</Text.Label>
                  <Text.Paragraph>{feedItem.narrativeText}</Text.Paragraph>
                </Column>
              )}

              {!!feedItem.audioUrl && (
                <Column gap="xs">
                  <Text.Label>Audio Tour</Text.Label>
                  <AudioPlayer src={feedItem.audioUrl} />
                </Column>
              )}

              {feedItem.status !== 'ready' && (
                <Box>
                  <Text.Label>
                    Status: {feedItem.status.replaceAll('_', ' ')}
                  </Text.Label>
                </Box>
              )}

              {!!feedItem.error && (
                <Box>
                  <Text.Label color="warning">
                    Error: {feedItem.error}
                  </Text.Label>
                </Box>
              )}
            </Column>
          </Box>
        </Column>
      </ScrollView>
    </Screen.Static>
  )
}

const styles = StyleSheet.create(theme => ({
  mainPhoto: {
    backgroundColor: theme.color.screen.background.default,
  },
  photoIndicators: {
    position: 'absolute',
    bottom: theme.size.md,
    left: 0,
    right: 0,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.color.text.default,
    opacity: 0.6,
  },
  activeIndicator: {
    backgroundColor: theme.color.text.default,
    opacity: 1,
  },
  thumbnailStrip: {
    paddingHorizontal: theme.size.sm,
    paddingVertical: theme.size.sm,
    gap: theme.size.sm,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: theme.size.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeThumbnail: {
    borderColor: theme.color.text.link,
  },
}))
