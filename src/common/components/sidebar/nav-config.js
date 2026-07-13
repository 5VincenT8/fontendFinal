import { 
  Package, PackagePlus, Layers, FolderPlus, 
  ShoppingCart, Ban, Truck, Receipt, FileText, 
  UserPlus,
  FileX
} from "lucide-react";

export const navGroups = [
  {
    label: "CATÁLOGO",
    items: [
      { path: "/home/inventario", icon: Package, label: "Inventario" },
      { path: "/home/productos", icon: PackagePlus, label: "Agregar Producto" },
      { path: "/home/lote", icon: Layers, label: "Agregar Lote" },
      { path: "/home/categoria", icon: FolderPlus, label: "Agregar Categoría" },
    ],
  },
  {
    label: "VENTAS",
    items: [
      { path: "/home/realizar-venta", icon: ShoppingCart, label: "Realizar Venta" },
      { path: "/home/cancelar-venta", icon: Ban, label: "Cancelar Venta" },
    ],
  },
  {
    label: "DOCUMENTOS",
    items: [
      { path: "/home/guia-remision", icon: Truck, label: "Guía de Remisión" },
      { path: "/home/anular-comprobantes", icon: FileX, label: "Anular Comprobantes" },
      { path: "/home/facturas", icon: FileText, label: "Facturaciones" },
      { path: "/home/add-cliente", icon: UserPlus, label: "Añadir Cliente" },
    ],
  },
]