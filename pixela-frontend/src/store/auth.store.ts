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
    const token = localStorage.getItem('auth_token');
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const user = await response.json();
        set({ isAuthenticated: true, user });
      } else {
        localStorage.removeItem('auth_token');
        set({ isAuthenticated: false, user: null });
      }
    } catch (error) {
      localStorage.removeItem('auth_token');
      set({ isAuthenticated: false, user: null });
    }
  },

  logout: async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }

    try {
      await fetch('http://127.0.0.1:8000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      localStorage.removeItem('auth_token');
      set({ isAuthenticated: false, user: null });
      
    } catch (error) {
      console.error('Error during logout:', error);
    }
  },
})); 