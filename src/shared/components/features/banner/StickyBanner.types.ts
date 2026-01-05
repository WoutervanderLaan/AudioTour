import type {TestProps} from '@/shared/types/TestProps'

/**
 * StickyBannerProps
 * Props for the StickyBanner component
 */
export type StickyBannerProps = TestProps<'StickyBanner'> & {
  /**
   * title - Main title text for the banner
   */
  title: string
  /**
   * message - Optional message or description text
   */
  message?: string
  /**
   * ctaLabel - Call-to-action button label
   */
  ctaLabel?: string
  /**
   * onCtaPress - Callback when CTA is pressed
   */
  onCtaPress?: () => void
  /**
   * onDismiss - Optional callback when banner is dismissed
   */
  onDismiss?: () => void
  /**
   * variant - Visual variant of the banner
   */
  variant?: 'info' | 'warning' | 'success'
}
