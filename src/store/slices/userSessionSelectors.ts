import {shallow} from 'zustand/shallow'

import {useUserSessionStore} from './userSessionStore'

/**
 * useSessionId
 * Selector hook for getting the current session ID.
 *
 * @returns The unique session identifier
 */
export const useSessionId = (): string =>
  useUserSessionStore(state => state.sessionId)

/**
 * useCurrentUser
 * Selector hook for getting the current user profile.
 *
 * @returns The current user profile, or undefined if not logged in
 */
export const useCurrentUser = () => useUserSessionStore(state => state.user)

/**
 * useUserSessionActions
 * Selector hook for getting user session store actions.
 * Uses shallow equality to prevent unnecessary re-renders.
 *
 * @returns Object containing user session store action methods
 */
export const useUserSessionActions = () =>
  useUserSessionStore(
    state => ({
      setUser: state.setUser,
      regenerateSession: state.regenerateSession,
    }),
    shallow,
  )
