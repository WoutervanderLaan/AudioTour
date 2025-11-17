import React, {createContext, useMemo} from 'react'

import {ApiClient} from '@/shared/lib/api/client'

export const ApiContext = createContext<ApiClient | undefined>(undefined)

/**
 * function ApiProvider
 * TODO: describe what it does.
 *
 * @param {*} param
 * @returns {*} describe return value
 */
export const ApiProvider = ({
  children,
}: Readonly<{children: React.ReactNode}>): React.JSX.Element => {
  const api = useMemo(() => new ApiClient(), [])

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}
