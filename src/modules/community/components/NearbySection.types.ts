import type {TestProps} from '@/shared/types/TestProps'

/**
 * NearbySectionProps
 * Props for the NearbySection component.
 */
export type NearbySectionProps = TestProps<'NearbySection'> & {
  /**
   * Callback when a tour is pressed
   */
  onTourPress: (tourId: string) => void
}
