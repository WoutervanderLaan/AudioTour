import type React from 'react'
import {Alert} from 'react-native'

import * as Device from 'expo-device'
import * as ImagePicker from 'expo-image-picker'

import {logger} from '@/core/lib/logger'
import {AddPhoto} from '@/shared/components/features/add-photo/AddPhoto'
import {Thumbnail} from '@/shared/components/features/thumbnail/Thumbnail'
import {Row} from '@/shared/components/ui/layout/Row'

/**
 * ImageInputProps
 * Props for the ImageInput component
 */
export type ImageInputProps = {
  /**
   * disabled - Whether the input is disabled
   */
  disabled?: boolean
  /**
   * maxImages - Maximum number of images allowed (default: 5)
   */
  maxImages?: number
  /**
   * value - Array of image URIs
   */
  value?: string[]
  /**
   * onChange - Callback when images change
   */
  onChange?: (images: string[]) => void
  /**
   * thumbnailSize - Size of thumbnail images (default: 'md')
   */
  thumbnailSize?: 'sm' | 'md' | 'lg'
  /**
   * testID - Test identifier for automated testing
   */
  testID?: string
}

/**
 * ImageInput
 * Pure accessible image input component for selecting and managing multiple images.
 * Allows users to select images from camera or library and displays thumbnails with delete functionality.
 * Follows WCAG 2.1 AA standards for accessibility.
 *
 * This is a pure input component that should be wrapped with FormField for label,
 * error, and help text functionality.
 *
 * Features:
 * - Multiple image selection via ImagePicker
 * - Thumbnail preview with delete functionality
 * - Configurable max images limit
 * - Disabled state support
 * - Camera or library selection support
 *
 * Usage with FormField:
 * ```tsx
 * <FormField
 *   label="Upload Photos"
 *   error={errors.photos}
 *   hint={`${photos.length} / 5 photos`}
 * >
 *   <ImageInput
 *     value={photos}
 *     onChange={setPhotos}
 *     maxImages={5}
 *   />
 * </FormField>
 * ```
 *
 * @param props - Component props
 * @returns Rendered image input element
 */
export const ImageInput = ({
  disabled = false,
  maxImages = 5,
  value = [],
  onChange,
  thumbnailSize = 'md',
  testID,
}: ImageInputProps): React.JSX.Element => {
  const canAddMore = value.length < maxImages && !disabled

  /**
   * handleAddImage
   * Opens image picker to add a new image
   *
   * @returns Promise that resolves when image is added or picker is cancelled
   */
  const handleAddImage = async (type?: 'camera' | 'library'): Promise<void> => {
    try {
      const result = await ImagePicker[
        type === 'camera' ? 'launchCameraAsync' : 'launchImageLibraryAsync'
      ]({
        mediaTypes: ['images'],
        quality: 0.8,
        allowsEditing: false,
      })

      if (!result.canceled && result.assets?.[0]?.uri) {
        const newImages = [...value, result.assets[0].uri]
        onChange?.(newImages)
      }
    } catch (err) {
      Alert.alert('Something went wrong', 'Unable to select image')
      logger.error('[ImageInput] Error adding image:', err)
    }
  }

  /**
   * handleDeleteImage
   * Removes an image from the list
   *
   * @param index - Index of image to remove
   * @returns void
   */
  const handleDeleteImage = (index: number): void => {
    if (disabled) return
    const newImages = value.filter((_, i) => i !== index)
    onChange?.(newImages)
  }

  /**
   * handleInitImageAdd
   * Prompts user to choose between camera or library for adding a new image.
   * Shows an alert dialog on physical devices with options for camera or library.
   *
   * @returns void
   */
  const handleInitImageAdd = (): void => {
    if (Device.isDevice) {
      Alert.alert(
        'Do you want to upload an image from the photo library or take a new image with your camera?',
        undefined,
        [
          {
            text: 'Camera',
            isPreferred: true,
            onPress: async (): Promise<void> => handleAddImage('camera'),
          },
          {
            text: 'Library',
            isPreferred: false,
            onPress: async (): Promise<void> => handleAddImage('library'),
          },
        ],
      )
    }
  }

  return (
    <Row
      gap="sm"
      justifyContent="flex-start"
      wrap="wrap"
      testID={testID}>
      {value.map((imageUri, index) => (
        <Thumbnail
          key={`image-${index + 1}`}
          source={{uri: imageUri}}
          deletable
          size={thumbnailSize}
          resizeMode="cover"
          onDelete={() => handleDeleteImage(index)}
          accessibilityLabel={`Image ${index + 1} of ${value.length}`}
        />
      ))}

      {!!canAddMore && (
        <AddPhoto
          onPress={handleInitImageAdd}
          size={thumbnailSize}
          accessibilityLabel={`Add image, ${value.length} of ${maxImages} selected`}
        />
      )}
    </Row>
  )
}
