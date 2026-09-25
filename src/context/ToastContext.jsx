import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AlertCircle, Check, Info, X } from 'lucide-react';

const ToastContext = createContext(null);
const icons = { success: Check, error: AlertCircle, info: Info };

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismissToast = useCallback((id) => {
    const timer = timers.current.get(id);
    if (timer) window.clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback((message, type = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((current) => [...current.slice(-3), { id, message, type }]);
    timers.current.set(id, window.setTimeout(() => dismissToast(id), 4000));
    return id;
  }, [dismissToast]);

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div className="pointer-events-none fixed right-4 top-24 z-[100] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3 sm:right-8" aria-live="polite" aria-relevant="additions">
        {toasts.map((toast) => {
          const Icon = icons[toast.type] || Info;
          const success = toast.type === 'success';
          const error = toast.type === 'error';
          return <div key={toast.id} role={error ? 'alert' : 'status'} className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/10 bg-brand-navy px-4 py-3 text-sm font-medium text-white shadow-xl shadow-brand-navy/20">
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${success ? 'bg-brand-green text-brand-navy' : error ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-brand-blue'}`}><Icon className="h-4 w-4" /></span>
            <span className="min-w-0 flex-1">{toast.message}</span>
            <button type="button" onClick={() => dismissToast(toast.id)} aria-label="Dismiss notification" className="rounded-full p-1 text-white/70 transition hover:bg-white/10 hover:text-white"><X className="h-4 w-4" /></button>
          </div>;
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const notify = useContext(ToastContext);
  if (!notify) throw new Error('useToast must be used within ToastProvider.');
  return notify;
}
