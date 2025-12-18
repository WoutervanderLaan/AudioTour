import type React from 'react'
import {Alert} from 'react-native'

import * as Device from 'expo-device'
import * as ImagePicker from 'expo-image-picker'

import {logger} from '@/core/lib/logger'
import {AddPhoto} from '@/shared/components/features/add-photo/AddPhoto'
import {Thumbnail} from '@/shared/components/features/thumbnail/Thumbnail'
import {Column} from '@/shared/components/ui/layout/Column'
import {Row} from '@/shared/components/ui/layout/Row'
import {Text} from '@/shared/components/ui/typography'

/**
 * ImageInputProps
 * Props for the ImageInput component
 */
export type ImageInputProps = {
  /**
   * label - Accessible label for the image input field
   */
  label?: string
  /**
   * error - Error message to display below the input
   */
  error?: string
  /**
   * hint - Helper text to display below the input
   */
  hint?: string
  /**
   * disabled - Whether the input is disabled
   */
  disabled?: boolean
  /**
   * required - Whether the input is required (adds asterisk to label)
   */
  required?: boolean
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
 * ImageInputLabelProps
 * Props for the ImageInputLabel component
 */
type ImageInputLabelProps = {
  /**
   * label - Text to display in the label
   */
  label: string
  /**
   * disabled - Whether the input is disabled
   */
  disabled: boolean
  /**
   * required - Whether the field is required
   */
  required: boolean
  /**
   * currentCount - Current number of images
   */
  currentCount: number
  /**
   * maxImages - Maximum number of images allowed
   */
  maxImages: number
}

/**
 * ImageInputLabel
 * Renders the label for the image input with image count
 *
 * @param props - Component props
 * @returns Rendered label element
 */
const ImageInputLabel = ({
  label,
  disabled,
  required,
  currentCount,
  maxImages,
}: ImageInputLabelProps): React.JSX.Element => (
  <Row
    gap="xs"
    center>
    <Text.Label
      color={disabled ? 'secondary' : 'default'}
      accessibilityRole="text">
      {label}
      {!!required && (
        <Text.Label
          color="warning"
          accessibilityLabel="required">
          {' '}
          *
        </Text.Label>
      )}
    </Text.Label>
    <Text.Label color="secondary">
      {currentCount} / {maxImages}
    </Text.Label>
  </Row>
)

/**
 * HelpTextProps
 * Props for the HelpText component
 */
type HelpTextProps = {
  /**
   * text - The help text or error message to display
   */
  text: string
  /**
   * hasError - Whether this is an error message
   */
  hasError: boolean
}

/**
 * HelpText
 * Renders the help text or error message for the image input
 *
 * @param props - Component props
 * @returns Rendered help text element
 */
const HelpText = ({text, hasError}: HelpTextProps): React.JSX.Element => (
  <Text.Label
    color={hasError ? 'warning' : 'secondary'}
    accessibilityRole="text"
    accessibilityLiveRegion={hasError ? 'polite' : 'none'}>
    {text}
  </Text.Label>
)

/**
 * ImageInput
 * Accessible image input component with theme integration and form validation support.
 * Allows users to select and manage multiple images with configurable max limit.
 * Follows WCAG 2.1 AA standards for accessibility.
 *
 * Features:
 * - Multiple image selection via ImagePicker
 * - Thumbnail preview with delete functionality
 * - Configurable max images limit
 * - Error state visualization
 * - Helper text support
 * - Required field indicator
 * - Disabled state support
 * - Accessible labels and error messages
 *
 * @param props - Component props
 * @returns Rendered image input element
 */
export const ImageInput = ({
  label,
  error,
  hint,
  disabled = false,
  required = false,
  maxImages = 5,
  value = [],
  onChange,
  thumbnailSize = 'md',
  testID,
}: ImageInputProps): React.JSX.Element => {
  const hasError = Boolean(error)
  const helpText = error || hint
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

  return (
    <Column
      gap="sm"
      testID={testID}>
      {!!label && (
        <ImageInputLabel
          label={label}
          disabled={disabled}
          required={required}
          currentCount={value.length}
          maxImages={maxImages}
        />
      )}

      <Row
        gap="sm"
        justifyContent="flex-start"
        wrap="wrap">
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
            onPress={() =>
              handleAddImage(Device.isDevice ? 'camera' : 'library')
            }
            size={thumbnailSize}
            accessibilityLabel={`Add image, ${value.length} of ${maxImages} selected`}
          />
        )}
      </Row>

      {!!helpText && (
        <HelpText
          text={helpText}
          hasError={hasError}
        />
      )}
    </Column>
  )
}
