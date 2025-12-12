import {useContext} from 'react'

import {BannerContext} from '@/shared/context/banner/BannerContext'
import type {BannerContextType} from '@/shared/context/banner/BannerContext.types'

/**
 * useBanner
 * React hook that provides access to the banner notification system for displaying sticky banners to users.
 *
 * @returns Banner context with methods to show and hide banner notifications
 */
export function useBanner(): BannerContextType {
  const ctx = useContext(BannerContext)
  if (!ctx) throw new Error('useBanner must be used within BannerProvider')
  return ctx
}
