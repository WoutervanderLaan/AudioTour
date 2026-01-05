import type {TestProps} from '@/shared/types/TestProps'

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
} & TestProps<'PhotoGallery'>
