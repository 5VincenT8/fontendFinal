import { create } from "zustand";
import { persist } from "zustand/middleware"; // 1. Importa el middleware

export const useCategoriaStore = create(
  persist( // 2. Envuelve el create con persist
    (set, get) => ({
      categorias: [],

      setCategorias: (data) => set({ categorias: data }),

      addCategoria: (nuevaCategoria) => {
        set({
          categorias: [...get().categorias, nuevaCategoria],
        });
      },
    }),
    {
      name: "categoria-storage", // 3. Nombre único en localStorage
    }
  )
);