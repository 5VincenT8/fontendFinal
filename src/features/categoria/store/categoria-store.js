import { create } from "zustand";
import { persist } from "zustand/middleware"; 

export const useCategoriaStore = create(
  persist(
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
      name: "categoria-storage",
    }
  )
);