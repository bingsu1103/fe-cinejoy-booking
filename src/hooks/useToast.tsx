import { useCallback } from "react";
import { toastStore } from "../store/toastStore";

export function useToast() {
  const push = toastStore((s) => s.push);

  const success = useCallback(
    (message: string) => {
      push({ message, type: "success" });
    },
    [push]
  );

  const error = useCallback(
    (message: string) => {
      push({ message, type: "error" });
    },
    [push]
  );

  const info = useCallback(
    (message: string) => {
      push({ message, type: "info" });
    },
    [push]
  );

  return { success, error, info };
}
