import type {TestProps} from '@/shared/types/TestProps'

/**
 * RecommendedSectionProps
 * Props for the RecommendedSection component.
 */
export type RecommendedSectionProps = TestProps<'RecommendedSection'> & {
  /**
   * Callback when a tour is pressed
   */
  onTourPress: (tourId: string) => void
}
