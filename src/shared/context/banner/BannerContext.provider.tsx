import React, {useCallback, useMemo, useState} from 'react'

import {BannerContext} from './BannerContext'
import type {BannerProps} from './BannerContext.types'

/**
 * Provider component that manages banner state throughout the app.
 *
 * Provides methods to show and hide banner notifications. The banner
 * is rendered at the app level and can be triggered from any screen
 * using the useBanner hook.
 *
 * **Important**: Only one banner can be displayed at a time. Calling
 * `showBanner()` multiple times will replace the current banner with
 * the new one (last-call-wins strategy).
 *
 * @param props - Component props with children to wrap
 * @param props.children - Child components that will have access to banner context
 * @returns Banner context provider component
 *
 * @example
 * ```tsx
 * <BannerProvider>
 *   <App />
 * </BannerProvider>
 * ```
 */
export const BannerProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element => {
  const [banner, setBanner] = useState<BannerProps | null>(null)

  /**
   * showBanner
   * Displays a banner with the provided configuration.
   * If a banner is already shown, it will be replaced with the new one.
   *
   * @param bannerProps - Banner configuration including title, message, CTA, etc.
   */
  const showBanner = useCallback((bannerProps: BannerProps): void => {
    setBanner(bannerProps)
  }, [])

  /**
   * hideBanner
   * Hides the currently displayed banner
   */
  const hideBanner = useCallback((): void => {
    setBanner(null)
  }, [])

  const value = useMemo(
    () => ({showBanner, hideBanner, banner}),
    [showBanner, hideBanner, banner],
  )

  return (
    <BannerContext.Provider value={value}>{children}</BannerContext.Provider>
  )
}
