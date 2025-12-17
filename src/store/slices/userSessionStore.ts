/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as Crypto from 'expo-crypto'
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'

/**
 * UserProfile
 *
 * Represents a user's profile information including identification and display preferences.
 */
export type UserProfile = {
  /**
   * Unique identifier for the user
   */
  id?: string
  /**
   * User's display name shown in the UI
   */
  displayName?: string
}

/**
 * UserSessionState
 *
 * Manages user session data including unique session identifier and profile information.
 * Used to track user activity across app sessions and maintain user context.
 */
type UserSessionState = {
  /**
   * Unique session identifier generated on app start or regenerated on demand
   */
  sessionId: string
  /**
   * Current user's profile information, undefined when not logged in
   */
  user?: UserProfile
  /**
   * Update the current user's profile information
   */
  setUser: (user?: UserProfile) => void
  /**
   * Generate a new session ID for the current session
   */
  regenerateSession: () => void
}

export const useUserSessionStore = create<UserSessionState>()(
  immer(set => ({
    sessionId: Crypto.randomUUID(),
    user: undefined,
    setUser: user =>
      set(state => {
        state.user = user
      }),
    regenerateSession: () =>
      set(state => {
        state.sessionId = Crypto.randomUUID()
      }),
  })),
)
