import type {FeaturedSectionType} from '../types'

import type {TestProps} from '@/shared/types/TestProps'

/**
 * FeaturedToursHeaderProps
 * Props for the FeaturedToursHeader component.
 */
export type FeaturedToursHeaderProps = TestProps<'FeaturedToursHeader'> & {
  /**
   * Currently active section
   */
  activeSection: FeaturedSectionType
  /**
   * Callback when section is changed
   */
  onSectionChange: (section: FeaturedSectionType) => void
  /**
   * Callback when a tour is pressed
   */
  onTourPress: (tourId: string) => void
}
