import React from 'react'

import type {CommunityTourSummary} from '../types'
import {CompactTourCard} from './CompactTourCard'
import {FullTourCard} from './FullTourCard'

import type {TestProps} from '@/shared/types/TestProps'

/**
 * CommunityTourCardProps
 * Props for the CommunityTourCard component.
 */
type CommunityTourCardProps = TestProps<'CommunityTourCard'> & {
  /**
   * Community tour summary data to display
   */
  tour: CommunityTourSummary
  /**
   * Callback when the card is pressed
   */
  onPress: () => void
  /**
   * Whether to show a compact version (for horizontal scrolling)
   */
  compact?: boolean
}

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
