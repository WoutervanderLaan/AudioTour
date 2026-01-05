import type {ImageProps} from 'react-native'

import type {TestProps} from '@/shared/types/TestProps'

/**
 * WithDelete
 * Type definition for thumbnail components that support deletion.
 * Requires both deletable flag and onDelete callback to be provided together.
 */
export type WithDelete = {
  /**
   * Flag indicating that the thumbnail can be deleted
   */
  deletable: true
  /**
   * Callback function invoked when the delete button is pressed
   */
  onDelete: () => void
}

/**
 * ThumbnailProps
 * Props for the Thumbnail component.
 * Extends ImageProps with size options and optional deletion functionality.
 */
export type ThumbnailProps = Omit<ImageProps, 'testID'> &
  TestProps<'Thumbnail'> & {
    /**
     * Size variant for the thumbnail (default: 'md')
     */
    size?: 'sm' | 'md' | 'lg'
  } & ({deletable?: false; onDelete?: never} | WithDelete)
