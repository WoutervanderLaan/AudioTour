import React from 'react'

import type {CommunityTourCardProps} from './CommunityTourCard.types'
import {CompactTourCard} from './CompactTourCard'
import {FullTourCard} from './FullTourCard'

/**
 * CommunityTourCard
 * Card component for displaying a community tour summary.
 * Shows hero image, title, author, museum, rating, and metadata.
 * Supports both compact and full display modes.
 *
 * @param props - Component props
 * @returns Community tour card component
 */
export const CommunityTourCard = ({
  tour,
  onPress,
  compact = false,
  testID,
}: CommunityTourCardProps): React.JSX.Element => {
  if (compact) {
    return (
      <CompactTourCard
        tour={tour}
        onPress={onPress}
        testID={testID}
      />
    )
  }

  return (
    <FullTourCard
      tour={tour}
      onPress={onPress}
      testID={testID}
    />
  )
}
