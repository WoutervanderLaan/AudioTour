import type {CommunityTourSummary} from '../types'

import type {TestProps} from '@/shared/types/TestProps'

/**
 * FullTourCardProps
 * Props for the FullTourCard component.
 */
export type FullTourCardProps = TestProps<'CommunityTourCard'> & {
  /**
   * Community tour summary data to display
   */
  tour: CommunityTourSummary
  /**
   * Callback when the card is pressed
   */
  onPress: () => void
}

/**
 * TourMetadataProps
 * Props for the TourMetadata component.
 */
export type TourMetadataProps = TestProps<'CommunityTourCard'> & {
  tour: CommunityTourSummary
}
