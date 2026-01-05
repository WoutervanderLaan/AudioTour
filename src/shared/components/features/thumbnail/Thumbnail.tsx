import type React from 'react'
import {Image} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import type {ThumbnailProps} from './Thumbnail.types'

import {Column} from '@/shared/components/ui/layout/Column'
import {IconButton} from '@/shared/components/ui/pressable/IconButton'

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
  testID,
  ...image
}: ThumbnailProps): React.JSX.Element => {
  return (
    <Column testID={`${testID}Container`}>
      <Image
        {...image}
        testID={testID}
        style={styles[size]}
        resizeMode="cover"
      />
      {!!deletable && (
        <IconButton
          testID={`${testID}DeleteIconButton`}
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
