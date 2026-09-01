import { createContext, useContext } from "react";

type AddToast = (message: string, type?: "success" | "error") => void;

export const ToastContext = createContext<AddToast>(() => {});

export function useToastContext() {
  return useContext(ToastContext);
}