import type {CommunityTourSummary} from '../types'

import type {TestProps} from '@/shared/types/TestProps'

/**
 * CommunityTourCardProps
 * Props for the CommunityTourCard component.
 */
export type CommunityTourCardProps = TestProps<'CommunityTourCard'> & {
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
