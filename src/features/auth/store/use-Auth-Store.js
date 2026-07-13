import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // 1. Importa el middleware

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      loginAt: null,
      login: () => set({ isAuthenticated: true,loginAt: Date.now()}),
      logout: () => set({ isAuthenticated: false, loginAt: null}),
    }),
    {
      name: 'auth-storage', // 2. Nombre del storage en el navegador
    }
  )
);