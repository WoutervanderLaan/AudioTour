import type {StickyBannerProps} from '@/shared/components/features/banner/StickyBanner'

/**
 * BannerProps
 * Props for displaying a banner including optional testID for testing purposes
 */
export type BannerProps = StickyBannerProps

/**
 * BannerContextType
 * Type definition for the banner context providing methods to show and hide banners.
 */
export type BannerContextType = {
  /**
   * showBanner
   * Shows a banner with the provided configuration
   */
  showBanner: (banner: BannerProps) => void
  /**
   * hideBanner
   * Hides the currently displayed banner
   */
  hideBanner: () => void
  /**
   * banner
   * The currently displayed banner configuration, or null if no banner is shown
   */
  banner: BannerProps | null
}
