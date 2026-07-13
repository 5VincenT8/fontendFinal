import { create } from "zustand";

export const useClientesStore = create((set) => ({
    clientes: [], // 📂 Aquí se guardarán todos tus clientes globalmente

    // ⚡ Acción para agregar el cliente recién creado al array existente
    addCliente: (nuevoCliente) => 
        set((state) => ({ 
            clientes: [...state.clientes, nuevoCliente] 
        })),

    // ⚡ Opcional: Por si luego necesitas llenar la lista desde un GET
    setClientes: (lista) => set({ clientes: lista }),
}));