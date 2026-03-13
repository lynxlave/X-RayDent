import { create } from "zustand";
import type { Session } from "./types";

const STORAGE_KEY = "xraydent.session";

type SessionState = {
  session: Session | null;
  setSession: (session: Session) => void;
  clearSession: () => void;
};

function loadSession(): Session | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export const useSessionStore = create<SessionState>((set) => ({
  session: loadSession(),
  setSession: (session) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }
    set({ session });
  },
  clearSession: () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    set({ session: null });
  },
}));
