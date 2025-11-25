import React, {createContext, useMemo} from 'react'

import {ApiClient} from '@/shared/lib/api/client'

export const ApiContext = createContext<ApiClient | undefined>(undefined)

/**
 * React Context Provider that initializes and provides the ApiClient instance.
 *
 * This component creates a singleton instance of ApiClient and makes it available
 * to all descendant components via React Context. The ApiClient is memoized to
 * ensure the same instance is used throughout the component tree lifecycle.
 *
 * Components can access the ApiClient using the useApi() hook.
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the API client
 * @returns {React.JSX.Element} Provider component wrapping children with ApiContext
 */
export const ApiProvider = ({
  children,
}: Readonly<{children: React.ReactNode}>): React.JSX.Element => {
  const api = useMemo(() => new ApiClient(), [])

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}
