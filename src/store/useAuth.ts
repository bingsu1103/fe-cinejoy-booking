import { create } from "zustand";

interface AuthState {
  user: IFetchUserRes | null;
  authenticated: boolean;

  setUser: (user: IFetchUserRes) => void;
  clearUser: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  authenticated: false,

  setUser: (user) => set({ user, authenticated: true }),

  clearUser: () =>
    set({
      user: null,
      authenticated: false,
    }),
}));
