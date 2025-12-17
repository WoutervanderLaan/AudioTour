import type React from 'react'
import {Image, type ImageProps} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {Column} from '../layout/Column'
import {IconButton} from '../pressable'

/**
 * WithDelete
 * Type definition for thumbnail components that support deletion.
 * Requires both deletable flag and onDelete callback to be provided together.
 */
type WithDelete = {
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
export type ThumbnailProps = ImageProps & {
  /**
   * Size variant for the thumbnail (default: 'md')
   */
  size?: 'sm' | 'md' | 'lg'
} & ({deletable?: false; onDelete?: never} | WithDelete)

/**
 * Thumbnail
 * Displays an image as a thumbnail with optional delete functionality.
 * Supports three size variants (sm: 60px, md: 100px, lg: 140px).
 * When deletable is true, shows a cancel icon button overlay.
 *
 * @param props - Thumbnail component props
 * @returns Thumbnail component with optional delete button
 */
export const Thumbnail = ({
  deletable,
  size = 'md',
  onDelete,
  ...image
}: ThumbnailProps): React.JSX.Element => {
  return (
    <Column>
      <Image
        {...image}
        style={styles[size]}
        resizeMode="cover"
      />
      {!!deletable && (
        <IconButton
          name="cancel"
          onPress={onDelete}
        />
      )}
    </Column>
  )
}

const styles = StyleSheet.create(theme => ({
  sm: {
    width: 60,
    height: 60,
    borderRadius: theme.size.sm,
  },
  md: {
    width: 100,
    height: 100,
    borderRadius: theme.size.md,
  },
  lg: {
    width: 140,
    height: 140,
    borderRadius: theme.size.lg,
  },
}))
