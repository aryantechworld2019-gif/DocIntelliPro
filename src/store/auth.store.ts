import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: 'admin' | 'staff' | 'viewer';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (username: string, password: string) => {
        // TODO: Implement actual authentication
        // For now, mock authentication
        if (username === 'admin' && password === 'admin') {
          const mockUser: User = {
            id: 1,
            username: 'admin',
            email: 'admin@docintelipro.com',
            fullName: 'System Administrator',
            role: 'admin',
          };

          set({ user: mockUser, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (updates: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
