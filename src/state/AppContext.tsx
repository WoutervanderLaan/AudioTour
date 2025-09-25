import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import * as Crypto from "expo-crypto";

type AppState = {
  userSessionId: string;
  currentMuseumId?: string;
  recentObjectIds: string[];
  setCurrentMuseumId: (id?: string) => void;
  pushRecentObjectId: (id: string) => void;
  resetSequence: () => void;
};

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userSessionId] = useState(() => Crypto.randomUUID());
  const [currentMuseumId, setCurrentMuseumId] = useState<string | undefined>(
    undefined
  );
  const [recentObjectIds, setRecentObjectIds] = useState<string[]>([]);

  const pushRecentObjectId = useCallback((id: string) => {
    setRecentObjectIds((prev) =>
      [id, ...prev.filter((x) => x !== id)].slice(0, 20)
    );
  }, []);

  const resetSequence = useCallback(() => setRecentObjectIds([]), []);

  const value = useMemo<AppState>(
    () => ({
      userSessionId,
      currentMuseumId,
      recentObjectIds,
      setCurrentMuseumId,
      pushRecentObjectId,
      resetSequence,
    }),
    [userSessionId, currentMuseumId, recentObjectIds]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
