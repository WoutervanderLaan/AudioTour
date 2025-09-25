import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import * as Crypto from "expo-crypto";

type UserProfile = {
  id?: string;
  displayName?: string;
};

type UserSessionState = {
  sessionId: string;
  user?: UserProfile;
  setUser: (user?: UserProfile) => void;
  regenerateSession: () => void;
};

export const useUserSessionStore = create<UserSessionState>()(
  immer((set) => ({
    sessionId: Crypto.randomUUID(),
    user: undefined,
    setUser: (user) =>
      set((state) => {
        state.user = user;
      }),
    regenerateSession: () =>
      set((state) => {
        state.sessionId = Crypto.randomUUID();
      }),
  }))
);
