import type {TestProps} from '@/shared/types/TestProps'

/**
 * RatingInputProps
 * Props for the RatingInput component.
 */
export type RatingInputProps = TestProps<'RatingInput'> & {
  /**
   * ID of the tour to rate
   */
  tourId: string
  /**
   * Callback when rating is submitted
   */
  onRated?: () => void
}
