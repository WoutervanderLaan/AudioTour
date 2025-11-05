import React, {createContext, useContext} from 'react'

import {ApiClient} from '@/api/client'

const ApiContext = createContext<ApiClient | undefined>(undefined)

/**
 * function ApiProvider
 * TODO: describe what it does.
 *
 * @param {*} param
 * @returns {*} describe return value
 */
export function ApiProvider({children}: {children: React.ReactNode}) {
  const api = new ApiClient()

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}

/**
 * useApi
 * TODO: describe what it does.
 *
 * @returns {*} describe return value
 */
export function useApi() {
  const ctx = useContext(ApiContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
