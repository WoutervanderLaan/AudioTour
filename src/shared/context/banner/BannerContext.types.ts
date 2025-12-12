import type {StickyBannerProps} from '@/shared/components/ui/banner/StickyBanner'

/**
 * BannerProps
 * Props for displaying a banner, omitting testID which is managed internally
 */
export type BannerProps = Omit<StickyBannerProps, 'testID'>

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
}
