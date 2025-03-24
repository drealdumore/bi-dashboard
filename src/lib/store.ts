import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

export type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  keepLoggedIn: boolean;
  lastActivity: number;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: User, token: string, keepLoggedIn: boolean) => void;
  logout: () => void;
  updateLastActivity: () => void;
  checkInactivity: () => boolean;
};

const INACTIVITY_TIMEOUT = 60 * 1000; // 1 minute in milliseconds

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      keepLoggedIn: false,
      lastActivity: Date.now(),
      isLoading: false,
      isAuthenticated: false,
      login: (user, token, keepLoggedIn) => {
        set({
          user,
          token,
          keepLoggedIn,
          lastActivity: Date.now(),
          isAuthenticated: true,
        });
        // Set authentication cookie
        Cookies.set('auth-token', token, {
          expires: keepLoggedIn ? 7 : 1, // 7 days if keep logged in, otherwise 1 day
        });
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          keepLoggedIn: false,
          isAuthenticated: false,
        });
        Cookies.remove('auth-token');
      },
      updateLastActivity: () => {
        set({ lastActivity: Date.now() });
      },
      checkInactivity: () => {
        const { lastActivity, keepLoggedIn } = get();

        // If keepLoggedIn is true, don't check for inactivity
        if (keepLoggedIn) return false;

        const currentTime = Date.now();
        const timeSinceLastActivity = currentTime - lastActivity;

        // Return true if inactive for too long
        return timeSinceLastActivity > INACTIVITY_TIMEOUT;
      },
    }),
    {
      name: 'auth-storage',
      skipHydration: true, // We'll handle hydration manually
    }
  )
);
