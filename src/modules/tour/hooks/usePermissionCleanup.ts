import {useEffect, useRef} from 'react'

import {logger} from '@/core/lib/logger/logger'

/**
 * UsePermissionCleanupParams
 * Parameters for usePermissionCleanup hook
 */
type UsePermissionCleanupParams = {
  /**
   * Callback to call when permission is granted
   */
  onPermissionGranted: () => void | Promise<void>
  /**
   * Callback to call when modal is dismissed without granting permission
   */
  onModalDismissed: () => void | Promise<void>
}

/**
 * UsePermissionCleanupResult
 * Return type for usePermissionCleanup hook
 */
export type UsePermissionCleanupResult = {
  /**
   * Marks permission as granted
   */
  markPermissionGranted: () => void
}

/**
 * usePermissionCleanup
 * Hook for handling cleanup callbacks when the permission screen unmounts.
 * Ensures callbacks are called exactly once based on whether permission was granted.
 *
 * @param params - Cleanup callbacks
 * @returns Cleanup handlers
 */
export const usePermissionCleanup = ({
  onPermissionGranted,
  onModalDismissed,
}: UsePermissionCleanupParams): UsePermissionCleanupResult => {
  const permissionGrantedRef = useRef(false)
  const callbackCalledRef = useRef(false)

  /**
   * markPermissionGranted
   * Marks that permission was granted
   */
  const markPermissionGranted = (): void => {
    permissionGrantedRef.current = true
  }

  // Handle modal unmount - call appropriate callback exactly once
  useEffect(() => {
    return (): void => {
      // Prevent double-calls
      if (callbackCalledRef.current) {
        return
      }
      callbackCalledRef.current = true

      // When component unmounts, call appropriate callback
      if (permissionGrantedRef.current) {
        // Permission was granted, call success callback
        Promise.resolve(onPermissionGranted()).catch(err =>
          logger.error(
            '[usePermissionCleanup] onPermissionGranted error:',
            err,
          ),
        )
      } else {
        // Modal was dismissed without granting permission
        Promise.resolve(onModalDismissed()).catch(err =>
          logger.error('[usePermissionCleanup] onModalDismissed error:', err),
        )
      }
    }
    // Only run on unmount - stable dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    markPermissionGranted,
  }
}
