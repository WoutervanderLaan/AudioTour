import type {TestProps} from '@/shared/types/TestProps'

/**
 * RatingDisplaySize
 * Available size variants for the rating display.
 */
export type RatingDisplaySize = 'sm' | 'md' | 'lg'

/**
 * RatingDisplayProps
 * Props for the RatingDisplay component.
 */
export type RatingDisplayProps = TestProps<'RatingDisplay'> & {
  /**
   * Rating value from 0-5
   */
  rating: number
  /**
   * Optional number of ratings to display
   */
  count?: number
  /**
   * Size variant for the stars
   */
  size?: RatingDisplaySize
  /**
   * Whether to show the numeric rating value
   */
  showValue?: boolean
}
