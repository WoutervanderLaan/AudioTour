import {useEffect} from 'react'

import {useQueryClient} from '@tanstack/react-query'

import {useAuthStore} from '../store/useAuthStore'

import {ApiError} from '@/core/api/types'
import {logger} from '@/core/lib/logger/logger'
import {TIMING} from '@/shared/constants/timing'

/**
 * Listens to auth state changes and handles token expiration
 */
export const useAuthStateListener = (): void => {
  const queryClient = useQueryClient()
  const {tokens, logout, isAuthenticated} = useAuthStore()

  useEffect(() => {
    // Check if access token is expired
    /**
     * Checks if the access token or refresh token has expired and triggers logout if necessary.
     * Runs every minute to ensure tokens are validated periodically.
     *
     * @returns void
     */
    const checkTokenExpiration = (): void => {
      if (!tokens?.accessTokenExpiresAt) return

      const expiresAt = new Date(tokens.accessTokenExpiresAt).getTime()
      const now = Date.now()

      // Token is expired
      if (now >= expiresAt) {
        logger.info('[Auth] Access token expired')

        // If refresh token is also expired, logout
        if (tokens.refreshTokenExpiresAt) {
          const refreshExpiresAt = new Date(
            tokens.refreshTokenExpiresAt,
          ).getTime()
          if (now >= refreshExpiresAt) {
            logger.info('[Auth] Refresh token expired, logging out')
            logout()
            queryClient.clear()
          }
        }
      }
    }

    if (isAuthenticated) {
      checkTokenExpiration()

      // Check every minute
      const interval = setInterval(
        checkTokenExpiration,
        TIMING.TOKEN_CHECK_INTERVAL,
      )
      return (): void => clearInterval(interval)
    }
  }, [tokens, isAuthenticated, logout, queryClient])

  // Listen for global 401 errors that couldn't be refreshed
  useEffect(() => {
    /**
     * Handles 401 Unauthorized API errors by logging out the user and clearing query cache.
     *
     * @param error - The API error to handle
     * @returns void
     */
    const _handleUnauthorized = (error: ApiError): void => {
      if (error.status === 401 && isAuthenticated) {
        logger.debug('[Auth] Unauthorized error, logging out')
        logout()
        queryClient.clear()
      }
    }

    // TODO: You can implement a global error handler here
    // For now, errors are handled in the API client
  }, [isAuthenticated, logout, queryClient])
}
