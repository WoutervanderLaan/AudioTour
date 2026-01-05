import type {CommunityTourSummary} from '../types'

import type {TestProps} from '@/shared/types/TestProps'

/**
 * CompactTourCardProps
 * Props for the CompactTourCard component.
 */
export type CompactTourCardProps = TestProps<'CommunityTourCard'> & {
  /**
   * Community tour summary data to display
   */
  tour: CommunityTourSummary
  /**
   * Callback when the card is pressed
   */
  onPress: () => void
}
