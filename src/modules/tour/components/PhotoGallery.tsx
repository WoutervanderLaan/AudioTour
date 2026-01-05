import React from 'react'
import {Image, ScrollView, useWindowDimensions} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import type {PhotoGalleryProps} from './PhotoGallery.types'

import {Thumbnail} from '@/shared/components/features/thumbnail/Thumbnail'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {PressableBase} from '@/shared/components/ui/pressable/PressableBase'

const INDICATOR_SIZE = 8

/**
 * PhotoGallery
 * Displays a photo gallery with main photo, indicators, and thumbnail strip
 *
 * @param props - Component props
 * @returns Photo gallery component
 */
export const PhotoGallery = ({
  photos,
  activePhotoIndex,
  onPhotoSelect,
  testID,
}: PhotoGalleryProps): React.JSX.Element | null => {
  const {width} = useWindowDimensions()

  if (photos.length === 0) {
    return null
  }

  const hasMultiplePhotos = photos.length > 1

  return (
    <Column testID={`${testID}Container`}>
      <Image
        source={{uri: photos[activePhotoIndex]}}
        style={[styles.mainPhoto, {width, height: width}]}
        resizeMode="cover"
      />

      {!!hasMultiplePhotos && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailStrip}>
          {photos.map((photo, index) => (
            <PressableBase
              key={photo}
              style={() => [
                styles.thumbnail,
                index === activePhotoIndex && styles.activeThumbnail,
              ]}
              onTouchEnd={() => onPhotoSelect(index)}
              testID={`${testID}Thumbnail${index + 1}Pressable`}>
              <Thumbnail
                source={{uri: photo}}
                resizeMode="cover"
                testID={`${testID}Thumbnail${index + 1}Thumbnail`}
              />
            </PressableBase>
          ))}
        </ScrollView>
      )}

      {!!hasMultiplePhotos && (
        <Row
          gap="xs"
          paddingTop="md"
          center
          testID={`${testID}IndicatorsRow`}>
          {photos.map((photo, index) => (
            <Box
              key={photo}
              style={[
                styles.indicator,
                index === activePhotoIndex && styles.activeIndicator,
              ]}
              testID={`${testID}Indicator${index + 1}Box`}
            />
          ))}
        </Row>
      )}
    </Column>
  )
}

const styles = StyleSheet.create(theme => ({
  mainPhoto: {
    backgroundColor: theme.color.screen.background.default,
  },
  indicator: {
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE,
    backgroundColor: theme.color.text.default,
    opacity: theme.opacity.disabled,
  },
  activeIndicator: {
    backgroundColor: theme.color.text.default,
    opacity: theme.opacity.none,
  },
  thumbnailStrip: {
    paddingHorizontal: theme.size.sm,
    paddingVertical: theme.size.sm,
    gap: theme.size.sm,
  },
  thumbnail: {
    ...theme.styles.border.default,
    borderColor: 'transparent',
  },
  activeThumbnail: {
    borderColor: theme.color.text.link,
  },
}))
