import React, {createContext, useMemo} from 'react'

import {ApiClient} from '@/lib/api/client'

export const ApiContext = createContext<ApiClient | undefined>(undefined)

/**
 * function ApiProvider
 * TODO: describe what it does.
 *
 * @param {*} param
 * @returns {*} describe return value
 */
export function ApiProvider({children}: {children: React.ReactNode}) {
  const api = useMemo(() => new ApiClient(), [])

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}
