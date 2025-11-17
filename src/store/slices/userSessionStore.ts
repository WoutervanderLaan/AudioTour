/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as Crypto from 'expo-crypto'
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'

/**
 * UserProfile
 * TODO: describe what this type represents.
 */
type UserProfile = {
  /**
   * id
   */
  id?: string
  /**
   * displayName
   */
  displayName?: string
}

/**
 * UserSessionState
 * TODO: describe what this type represents.
 */
type UserSessionState = {
  /**
   * sessionId
   */
  sessionId: string
  /**
   * user
   */
  user?: UserProfile
  /**
   * setUser
   */
  setUser: (user?: UserProfile) => void
  /**
   * regenerateSession
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
