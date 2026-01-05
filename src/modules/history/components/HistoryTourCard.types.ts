import type {TourSummary} from '../types'

import type {TestProps} from '@/shared/types/TestProps'

/**
 * HistoryTourCardProps
 * Props for the HistoryTourCard component.
 */
export type HistoryTourCardProps = TestProps<'HistoryTourCard'> & {
  /**
   * Tour summary data to display
   */
  tour: TourSummary
  /**
   * Callback when the card is pressed
   */
  onPress: () => void
}
