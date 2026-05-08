import { useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function useAdminFetch() {
  const { token, logout } = useAuth();

  const adminFetch = useCallback(
    async (url: string, options: RequestInit = {}): Promise<Response> => {
      const res = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(options.headers as Record<string, string> | undefined),
        },
      });
      if (res.status === 401) {
        logout();
        throw new Error("Session expired");
      }
      return res;
    },
    [token, logout]
  );

  return adminFetch;
}
