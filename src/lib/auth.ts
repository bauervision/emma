import { storageKey } from "./storage";

export type EmmaRole = "distribution" | "ct" | "ce" | "super";

export type EmmaSession = {
  role: EmmaRole;
  label: string;
  createdAt: number;
};

const SESSION_KEY = storageKey("session");

export const ROLE_OPTIONS: Array<{ role: EmmaRole; label: string }> = [
  { role: "distribution", label: "Distribution" },
  { role: "ct", label: "C&T (Clothing & Textiles)" },
  { role: "ce", label: "C&E (Construction & Equipment)" },
  { role: "super", label: "Super User" },
];

export function readSession(): EmmaSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as EmmaSession;
  } catch {
    return null;
  }
}

export function writeSession(role: EmmaRole) {
  if (typeof window === "undefined") return;
  const opt = ROLE_OPTIONS.find((o) => o.role === role);
  const session: EmmaSession = {
    role,
    label: opt?.label ?? role,
    createdAt: Date.now(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("emma:auth"));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("emma:auth"));
}

export function routeForRole(role: EmmaRole) {
  switch (role) {
    case "distribution":
      return "/distribution";
    case "ct":
      return "/ct";
    case "ce":
      return "/ce";
    case "super":
      return "/super";
  }
}
