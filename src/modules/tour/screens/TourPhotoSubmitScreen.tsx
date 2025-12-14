import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {Image, Pressable, ScrollView, View} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {zodResolver} from '@hookform/resolvers/zod'
import * as ImagePicker from 'expo-image-picker'
import {z} from 'zod'

import type {TourModalParams} from '../routes.types'

import {logger} from '@/core/lib/logger'
import {TextInputControlled} from '@/shared/components/ui/form'
import {Box} from '@/shared/components/ui/layout/Box'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Button} from '@/shared/components/ui/pressable'
import {Screen} from '@/shared/components/ui/screen'
import {Text} from '@/shared/components/ui/typography'
import {useNavigation} from '@/shared/hooks/useNavigation'
import type {RouteProp} from '@/shared/types/navigation'

const MAX_PHOTOS = 5

/**
 * photoSubmitSchema
 * Validation schema for photo submission form
 */
const photoSubmitSchema = z.object({
  title: z.string().optional(),
  artist: z.string().optional(),
  year: z.string().optional(),
  material: z.string().optional(),
  description: z.string().optional(),
})

/**
 * PhotoSubmitForm
 * Form data type for photo submission
 */
type PhotoSubmitForm = z.infer<typeof photoSubmitSchema>

/**
 * TourPhotoSubmitScreenProps
 * Props for the TourPhotoSubmitScreen
 */
type TourPhotoSubmitScreenProps = {
  /**
   * Navigation route prop
   */
  route: RouteProp<TourModalParams, 'TourPhotoSubmit'>
}

/**
 * TourPhotoSubmitScreen
 * Modal screen for submitting captured photos with optional metadata.
 * Supports multiple photos (up to MAX_PHOTOS) with add/delete functionality.
 *
 * @param props - Component props
 * @returns Tour photo submit screen component
 */
export const TourPhotoSubmitScreen = ({
  route,
}: TourPhotoSubmitScreenProps): React.JSX.Element => {
  const {goBack} = useNavigation()
  const {photos: initialPhotos = []} = route.params

  const [photos, setPhotos] = useState<string[]>(initialPhotos)

  const {control, handleSubmit} = useForm<PhotoSubmitForm>({
    resolver: zodResolver(photoSubmitSchema),
  })

  /**
   * handleAddPhoto
   * Opens camera/picker to add another photo
   *
   * @returns Promise that resolves when photo is added
   */
  const handleAddPhoto = async (): Promise<void> => {
    if (photos.length >= MAX_PHOTOS) {
      logger.warn('[TourPhotoSubmit] Max photos reached')
      return
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8,
        allowsEditing: false,
      })

      if (!result.canceled && result.assets?.[0]?.uri) {
        setPhotos(prev => [...prev, result.assets[0].uri])
      }
    } catch (err) {
      logger.error('[TourPhotoSubmit] Error adding photo:', err)
    }
  }

  /**
   * handleDeletePhoto
   * Removes a photo from the list
   *
   * @param index - Index of photo to remove
   * @returns void
   */
  const handleDeletePhoto = (index: number): void => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  /**
   * handleCancel
   * Cancels submission and returns to previous screen
   *
   * @returns void
   */
  const handleCancel = (): void => {
    goBack()
  }

  /**
   * onSubmit
   * Handles form submission with photos and metadata
   *
   * @param data - Form data with metadata fields
   * @returns void
   */
  const onSubmit = (data: PhotoSubmitForm): void => {
    logger.debug('[TourPhotoSubmit] Submitting:', {photos, metadata: data})
    // TODO: Will be implemented in API integration task
    // For now, just log and go back
    goBack()
  }

  const canAddMorePhotos = photos.length < MAX_PHOTOS
  const canSubmit = photos.length > 0

  return (
    <Screen.Scrollable keyboardAvoiding>
      <Box
        paddingH="md"
        paddingV="lg">
        <Column gap="lg">
          {/* Header */}
          <Column gap="xs">
            <Text.H2>Submit Photos</Text.H2>
            <Text.Caption>
              {photos.length} / {MAX_PHOTOS} photos
            </Text.Caption>
          </Column>

          {/* Photo Grid */}
          <Row
            gap="sm"
            flexWrap="wrap">
            {photos.map((photo, index) => (
              <View
                key={index}
                style={styles.photoContainer}>
                <Image
                  source={{uri: photo}}
                  style={styles.photo}
                  resizeMode="cover"
                />
                <Pressable
                  onPress={() => handleDeletePhoto(index)}
                  style={styles.deleteButton}>
                  <Text.Label style={styles.deleteText}>✕</Text.Label>
                </Pressable>
              </View>
            ))}

            {/* Add Photo Button */}
            {canAddMorePhotos && (
              <Pressable
                onPress={handleAddPhoto}
                style={styles.addPhotoButton}>
                <Text.H2 style={styles.addPhotoText}>+</Text.H2>
              </Pressable>
            )}
          </Row>

          {/* Metadata Form */}
          <Column gap="md">
            <Text.H3>Object Details (Optional)</Text.H3>

            <TextInputControlled
              control={control}
              name="title"
              label="Title"
              placeholder="e.g., The Starry Night"
            />

            <TextInputControlled
              control={control}
              name="artist"
              label="Artist"
              placeholder="e.g., Vincent van Gogh"
            />

            <Row gap="md">
              <Box flex={1}>
                <TextInputControlled
                  control={control}
                  name="year"
                  label="Year"
                  placeholder="e.g., 1889"
                  keyboardType="numeric"
                />
              </Box>
              <Box flex={1}>
                <TextInputControlled
                  control={control}
                  name="material"
                  label="Material"
                  placeholder="e.g., Oil on canvas"
                />
              </Box>
            </Row>

            <TextInputControlled
              control={control}
              name="description"
              label="Description"
              placeholder="Add any additional notes..."
              multiline
              numberOfLines={4}
            />
          </Column>

          {/* Action Buttons */}
          <Column gap="sm">
            <Button
              label="Submit"
              onPress={handleSubmit(onSubmit)}
              disabled={!canSubmit}
              size="large"
            />
            <Button
              label="Cancel"
              onPress={handleCancel}
              variant="secondary"
            />
          </Column>
        </Column>
      </Box>
    </Screen.Scrollable>
  )
}

const styles = StyleSheet.create(theme => ({
  photoContainer: {
    position: 'relative',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.md,
  },
  deleteButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.surface.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: theme.colors.text.onError,
    fontSize: 14,
    fontWeight: 'bold',
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.border.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface.secondary,
  },
  addPhotoText: {
    color: theme.colors.text.secondary,
    fontSize: 32,
  },
}))
