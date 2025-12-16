import type React from 'react'
import {Image, type ImageProps} from 'react-native'
import {StyleSheet} from 'react-native-unistyles'

import {Column} from '../layout/Column'
import {IconButton} from '../pressable'

/**
 * WithDelete
 * TODO: describe what this type represents.
 */
type WithDelete = {
  /**
   * deleteable
   */
  deletable: true
  /**
   * onDelete
   */
  onDelete: () => void
}

/**
 * ThumbnailProps
 * TODO: describe what this type represents.
 */
export type ThumbnailProps = ImageProps & {
  size?: 'sm' | 'md' | 'lg'
} & ({deletable?: false; onDelete?: never} | WithDelete)

/**
 * Thumbnail
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
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
