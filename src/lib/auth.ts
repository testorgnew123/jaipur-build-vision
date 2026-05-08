export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: "admin" | "super_admin";
}

interface StoredAuth {
  token: string;
  user: AuthUser;
}

const KEY = "admin_auth";

export function getStoredAuth(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as StoredAuth;
    const payload = JSON.parse(atob(data.token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem(KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function setStoredAuth(token: string, user: AuthUser): void {
  localStorage.setItem(KEY, JSON.stringify({ token, user }));
}

export function clearStoredAuth(): void {
  localStorage.removeItem(KEY);
}

export function isSuperAdmin(user: AuthUser): boolean {
  return user.role === "super_admin";
}
