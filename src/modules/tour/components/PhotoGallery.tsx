import React from 'react'
import {Image, ScrollView, useWindowDimensions} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {Thumbnail} from '@/shared/components/features/thumbnail/Thumbnail'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {PressableBase} from '@/shared/components/ui/pressable/PressableBase'

/**
 * PhotoGalleryProps
 * Props for the PhotoGallery component
 */
export type PhotoGalleryProps = {
  /**
   * Array of photo URIs to display
   */
  photos: string[]
  /**
   * Currently active photo index
   */
  activePhotoIndex: number
  /**
   * Callback when a photo is selected
   */
  onPhotoSelect: (index: number) => void
}

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
}: PhotoGalleryProps): React.JSX.Element | null => {
  const {width} = useWindowDimensions()

  if (photos.length === 0) {
    return null
  }

  const hasMultiplePhotos = photos.length > 1

  return (
    <Column>
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
              onTouchEnd={() => onPhotoSelect(index)}>
              <Thumbnail
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

      {!!hasMultiplePhotos && (
        <Row
          gap="xs"
          paddingTop="md"
          center>
          {photos.map((photo, index) => (
            <Box
              key={photo}
              style={[
                styles.indicator,
                index === activePhotoIndex && styles.activeIndicator,
              ]}
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
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeThumbnail: {
    borderColor: theme.color.text.link,
  },
}))
