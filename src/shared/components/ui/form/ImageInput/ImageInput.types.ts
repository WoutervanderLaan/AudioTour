import type {TestProps} from '@/shared/types/TestProps'

/**
 * ImageInputProps
 * Props for the ImageInput component
 */
export type ImageInputProps = TestProps<'ImageInput'> & {
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
}
