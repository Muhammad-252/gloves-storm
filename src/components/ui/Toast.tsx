"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X, Loader2 } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "loading";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => string;
  removeToast: (id: string) => void;
  toast: {
    success: (title: string, message?: string, duration?: number) => string;
    error: (title: string, message?: string, duration?: number) => string;
    info: (title: string, message?: string, duration?: number) => string;
    loading: (title: string, message?: string) => string;
    dismiss: (id: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ type, title, message, duration = 3500 }: Omit<ToastItem, "id">) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const newToast: ToastItem = { id, type, title, message, duration };

      setToasts((prev) => [...prev, newToast]);

      if (type !== "loading" && duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast]
  );

  const toastMethods = {
    success: (title: string, message?: string, duration = 3500) =>
      addToast({ type: "success", title, message, duration }),
    error: (title: string, message?: string, duration = 5000) =>
      addToast({ type: "error", title, message, duration }),
    info: (title: string, message?: string, duration = 3500) =>
      addToast({ type: "info", title, message, duration }),
    loading: (title: string, message?: string) =>
      addToast({ type: "loading", title, message, duration: 0 }),
    dismiss: (id: string) => removeToast(id),
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, toast: toastMethods }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
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

function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="assertive"
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none p-2 sm:p-0"
    >
      {toasts.map((item) => (
        <ToastCard key={item.id} item={item} onDismiss={() => onDismiss(item.id)} />
      ))}
    </div>
  );
}

function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const styles = {
    success: {
      bg: "bg-white/95 border-neutral-300 text-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
      icon: <CheckCircle2 className="w-5 h-5 text-neutral-900 shrink-0" />,
      accentBar: "bg-[#FFB900]",
    },
    error: {
      bg: "bg-white/95 border-neutral-300 text-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
      icon: <AlertCircle className="w-5 h-5 text-neutral-900 shrink-0" />,
      accentBar: "bg-neutral-900",
    },
    loading: {
      bg: "bg-white/95 border-neutral-300 text-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
      icon: <Loader2 className="w-5 h-5 text-neutral-900 animate-spin shrink-0" />,
      accentBar: "bg-[#FFB900]",
    },
    info: {
      bg: "bg-white/95 border-neutral-300 text-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
      icon: <Info className="w-5 h-5 text-neutral-900 shrink-0" />,
      accentBar: "bg-[#FFB900]",
    },
  }[item.type];

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-xl transition-all duration-300 animate-in slide-in-from-bottom-3 fade-in relative overflow-hidden ${styles.bg}`}
      role="status"
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${styles.accentBar}`} />

      <div className="mt-0.5">{styles.icon}</div>

      <div className="flex-1 min-w-0 pr-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 leading-snug">
          {item.title}
        </h4>
        {item.message && (
          <p className="text-xs text-slate-600 leading-relaxed mt-1 line-clamp-3">
            {item.message}
          </p>
        )}
      </div>

      <button
        onClick={onDismiss}
        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
        aria-label="Dismiss toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
