import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Profile } from "@/types";

interface AuthState {
  user: Profile | null;
  session: { access_token: string; expires_at: number } | null;
  isLoading: boolean;
  setUser: (user: Profile | null) => void;
  setSession: (session: { access_token: string; expires_at: number } | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setLoading: (isLoading) => set({ isLoading }),
      signOut: () => set({ user: null, session: null }),
    }),
    {
      name: "stadiumind-auth",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
