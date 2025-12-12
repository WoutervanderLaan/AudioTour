import {createContext} from 'react'

import type {BannerContextType} from './BannerContext.types'

/**
 * React Context for banner notification system.
 *
 * Provides banner state and methods throughout the app. Must be wrapped with BannerProvider
 * and accessed via the useBanner hook.
 *
 * @see BannerProvider
 * @see useBanner
 */
export const BannerContext = createContext<BannerContextType | undefined>(
  undefined,
)
