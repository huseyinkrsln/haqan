"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  toast: {
    success: (msg: string) => void;
    error: (msg: string) => void;
    info: (msg: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg: string) => addToast("success", msg),
    error: (msg: string) => addToast("error", msg),
    info: (msg: string) => addToast("info", msg),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Render Alanı */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl border shadow-lg backdrop-blur-md transition-all animate-in slide-in-from-top-4 duration-300 ${
              t.type === "success"
                ? "bg-white/95 border-emerald-200 text-emerald-900 shadow-emerald-500/10"
                : t.type === "error"
                ? "bg-white/95 border-rose-200 text-rose-900 shadow-rose-500/10"
                : "bg-white/95 border-gray-200 text-gray-900 shadow-gray-500/10"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  t.type === "success"
                    ? "bg-emerald-100 text-emerald-600"
                    : t.type === "error"
                    ? "bg-rose-100 text-rose-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {t.type === "success" && <CheckCircle2 size={18} />}
                {t.type === "error" && <AlertCircle size={18} />}
                {t.type === "info" && <Info size={18} />}
              </div>
              <p className="text-xs font-semibold leading-relaxed truncate">{t.message}</p>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-gray-400 hover:text-gray-700 w-6 h-6 rounded-lg flex items-center justify-center hover:bg-gray-100/60 transition-colors cursor-pointer shrink-0"
              aria-label="Kapat"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
