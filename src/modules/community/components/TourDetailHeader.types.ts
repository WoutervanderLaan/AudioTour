import type {CommunityTour} from '../types'

import type {TestProps} from '@/shared/types/TestProps'

/**
 * TourDetailHeaderProps
 * Props for the TourDetailHeader component.
 */
export type TourDetailHeaderProps = TestProps<'TourDetailHeader'> & {
  /**
   * The tour to display
   */
  tour: CommunityTour
  /**
   * Callback when start tour is pressed
   */
  onStartTour: () => void
  /**
   * Callback when rating is submitted
   */
  onRated: () => void
}

/**
 * TourMetaSectionProps
 * Props for the TourMetaSection component.
 */
export type TourMetaSectionProps = TestProps<'TourDetailHeader'> & {
  tour: CommunityTour
}

/**
 * TourStatsProps
 * Props for the TourStats component.
 */
export type TourStatsProps = TestProps<'TourDetailHeader'> & {
  tour: CommunityTour
}

/**
 * TourActionsProps
 * Props for the TourActions component.
 */
export type TourActionsProps = TestProps<'TourDetailHeader'> & {
  tour: CommunityTour
  onStartTour: () => void
  onRated: () => void
}
