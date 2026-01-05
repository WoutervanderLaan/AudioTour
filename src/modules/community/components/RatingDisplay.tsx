import React from 'react'

import {MaterialIcons} from '@expo/vector-icons'

import type {RatingDisplayProps, RatingDisplaySize} from './RatingDisplay.types'

import {Row} from '@/shared/components/ui/layout/Row'
import {Text} from '@/shared/components/ui/typography/Text'

/**
 * Size mappings for star icons.
 */
const STAR_SIZES: Record<RatingDisplaySize, number> = {
  sm: 14,
  md: 18,
  lg: 24,
}

/**
 * STAR_COLOR
 * Color for the star icons (gold/yellow for ratings).
 */
const STAR_COLOR = '#FFB800'

/**
 * RatingDisplay
 * Displays a star rating with optional count and numeric value.
 * Supports filled, half-filled, and empty stars.
 *
 * @param props - Component props
 * @returns Rating display component
 *
 * @example
 * ```tsx
 * <RatingDisplay rating={4.5} count={128} size="md" />
 * // Renders: ⭐⭐⭐⭐½ 4.5 (128)
 * ```
 */
export const RatingDisplay = ({
  rating,
  count,
  size = 'md',
  showValue = true,
  testID,
}: RatingDisplayProps): React.JSX.Element => {
  const starSize = STAR_SIZES[size]

  /**
   * getStarIcon
   * Determines the appropriate star icon for a given position.
   *
   * @param position - Star position (1-5)
   * @returns Icon name for the star
   */
  const getStarIcon = (
    position: number,
  ): 'star' | 'star-half' | 'star-border' => {
    const difference = rating - position + 1

    if (difference >= 1) {
      return 'star'
    } else if (difference >= 0.5) {
      return 'star-half'
    }
    return 'star-border'
  }

  return (
    <Row
      gap="xs"
      alignItems="center"
      testID={`${testID}Row`}>
      <Row testID={`${testID}StarsRow`}>
        {[1, 2, 3, 4, 5].map(position => (
          <MaterialIcons
            key={position}
            name={getStarIcon(position)}
            size={starSize}
            color={STAR_COLOR}
            testID={`${testID}Star${position}`}
          />
        ))}
      </Row>

      {!!showValue && (
        <Text.Paragraph
          variant={size === 'sm' ? 'extraSmall' : 'small'}
          color="secondary"
          testID={`${testID}ValueText`}>
          {rating.toFixed(1)}
        </Text.Paragraph>
      )}

      {count !== undefined && (
        <Text.Paragraph
          variant={size === 'sm' ? 'extraSmall' : 'small'}
          color="secondary"
          testID={`${testID}CountText`}>
          ({count})
        </Text.Paragraph>
      )}
    </Row>
  )
}
