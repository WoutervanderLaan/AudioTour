import React, { createContext, useContext, useState, useCallback } from "react";
import { Toast } from "../components/Toast";
import * as Crypto from "expo-crypto";

type Toast = {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
};

const DEFAULT_DURATION = 3000;

type ToastContextType = {
  showToast: (toast: Toast) => void;
  closeToast: () => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: ReactNavigation.Theme;
}) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((toast: Toast) => {
    setToast(toast);
    timeoutRef.current = setTimeout(
      () => setToast(null),
      toast.duration || DEFAULT_DURATION
    );
  }, []);

  return (
    <ToastContext.Provider
      value={{ showToast, closeToast: () => setToast(null) }}
    >
      {children}
      {toast && <Toast key={Crypto.randomUUID()} {...toast} theme={theme} />}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
