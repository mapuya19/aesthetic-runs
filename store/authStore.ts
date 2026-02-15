import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

interface AuthState {
  user: { id: string; email: string } | null;
  session: { user?: { id?: string; email?: string }; access_token?: string } | null;
  isAuthenticated: boolean;
  setAuth: (user: { id: string; email: string } | null, session: { user?: { id?: string; email?: string }; access_token?: string } | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isAuthenticated: false,
      setAuth: (user, session) => {
        if (session?.access_token) {
          localStorage.setItem('token', session.access_token);
        } else {
          localStorage.removeItem('token');
        }
        set({ user, session, isAuthenticated: !!user });
      },
      logout: async () => {
        localStorage.removeItem('token');
        await supabase.auth.signOut();
        set({ user: null, session: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
