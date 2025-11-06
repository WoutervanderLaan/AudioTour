import {useContext} from 'react'

import type {ApiClient} from '@/lib/api/client'
import {ApiContext} from '@/lib/api/Provider'

/**
 * useApi
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export function useApi(): ApiClient {
  const ctx = useContext(ApiContext)
  if (!ctx) throw new Error('useApi must be used within AppProvider')
  return ctx
}
