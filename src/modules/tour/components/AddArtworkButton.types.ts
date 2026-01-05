import type {TestProps} from '@/shared/types/TestProps'

/**
 * AddArtworkButtonProps
 * Props for the AddArtworkButton component
 */
export type AddArtworkButtonProps = TestProps<'AddArtworkButton'> & {
  /**
   * Optional disabled state
   */
  disabled?: boolean
  /**
   * Optional label override
   */
  label?: string
}
