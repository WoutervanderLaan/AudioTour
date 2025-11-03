import React, {createContext, useContext} from 'react'

import {ApiClient} from '@/api/client'

const ApiContext = createContext<ApiClient | undefined>(undefined)

export function ApiProvider({children}: {children: React.ReactNode}) {
  const api = new ApiClient()

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}

export function useApi() {
  const ctx = useContext(ApiContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
