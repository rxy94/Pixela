'use client';

import { create } from 'zustand';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  checkAuth: async () => {
    try {
      const response = await fetch('http://localhost:8000/api/user', {
        credentials: 'include',
      });
      
      if (response.ok) {
        const user = await response.json();
        set({ isAuthenticated: true, user });
      } else {
        set({ isAuthenticated: false, user: null });
      }
    } catch (error) {
      set({ isAuthenticated: false, user: null });
    }
  },

  logout: async () => {
    try {
      await fetch('http://localhost:8000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      set({ isAuthenticated: false, user: null });
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  },
})); 