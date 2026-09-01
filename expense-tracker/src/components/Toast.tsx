import { useEffect } from "react";
import "../styles/Toast.css";
import type { ToastMessage, ToastProps } from "../types/toast";

export default function Toast({ toasts, onRemove }: ToastProps) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: ToastMessage; onRemove: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <div className={`toast toast--${toast.type}`} onClick={() => onRemove(toast.id)}>
      <span className="toast__icon">
        {toast.type === "success" ? "✓" : "✕"}
      </span>
      <span>{toast.message}</span>
    </div>
  );
}