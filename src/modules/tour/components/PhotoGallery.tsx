import React from 'react'
import {Image, ScrollView, useWindowDimensions} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {Thumbnail} from '@/shared/components/features/thumbnail/Thumbnail'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {PressableBase} from '@/shared/components/ui/pressable/PressableBase'

const INDICATOR_SIZE = 8
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
  /**
   * Test ID for the component
   */
  testId?: string
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
  testId = 'PhotoGallery',
}: PhotoGalleryProps): React.JSX.Element | null => {
  const {width} = useWindowDimensions()

  if (photos.length === 0) {
    return null
  }

  const hasMultiplePhotos = photos.length > 1

  return (
    <Column testId={`${testId}ContainerView`}>
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
              onTouchEnd={() => onPhotoSelect(index)}
              testId={`${testId}Thumbnail${index + 1}Pressable`}>
              <Thumbnail
                source={{uri: photo}}
                style={[
                  styles.thumbnail,
                  index === activePhotoIndex && styles.activeThumbnail,
                ]}
                resizeMode="cover"
                testId={`${testId}Thumbnail${index + 1}Thumbnail`}
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
          testId={`${testId}IndicatorsView`}>
          {photos.map((photo, index) => (
            <Box
              key={photo}
              style={[
                styles.indicator,
                index === activePhotoIndex && styles.activeIndicator,
              ]}
              testId={`${testId}Indicator${index + 1}View`}
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
    borderWidth: theme.size.xxs,
    borderColor: theme.color.transparent.full,
  },
  activeThumbnail: {
    borderColor: theme.color.text.link,
  },
}))
