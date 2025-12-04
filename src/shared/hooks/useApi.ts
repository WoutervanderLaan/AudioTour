import {useContext} from 'react'

import {ApiClient} from '@/core/api/client-old'
import {ApiContext} from '@/shared/context/api/ApiContext'

/**
 * Custom React hook to access the ApiClient instance from context.
 *
 * This hook provides access to the shared ApiClient instance that is initialized
 * in the ApiProvider. It must be used within a component tree that is wrapped
 * by the ApiProvider, otherwise it will throw an error.
 *
 * @returns {ApiClient} The singleton ApiClient instance for making API requests
 * @throws {Error} When used outside of ApiProvider context
 */
export function useApi(): ApiClient {
  const ctx = useContext(ApiContext)
  if (!ctx) throw new Error('useApi must be used within ApiProvider')
  return ctx
}
