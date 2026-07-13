import { Landing } from "../app/landing/landing";
import { InfoLogin } from "../common/layouts/info-login";
import { createBrowserRouter,Navigate } from "react-router-dom";
import { SideBar } from "../common/layouts/sidebar";
import { ProtectedRoute } from "../common/components/protectedRoute/protecterRoute";
import { Dashboard } from "../app/dashboard/dashboard";
import { Root } from "../common/layouts/root";
import { Categoria } from "../app/categoria/categoria";
import { Products } from "../app/productos/products";
import { Lote } from "../app/lote/lote";
import { Inventario } from "../app/inventario/inventario";
import { Ventas } from "../app/ventas/ventas";
import { Cliente } from "../app/clientes/clientes";
import { CancelVenta } from "../app/ventas/cancel-venta";
import { Facturaciones } from "../app/facturacion/facturacion";
import { GuiaRemision } from "../app/guia-remision/guia-remision";
import { AnularComprobantes } from "../app/anular-comprobante/anular-comprobante";
import { AuthGuard } from "../common/components/protectedRoute/auth-guard";

export const router = createBrowserRouter([
{
    path: "/",
    element: <Navigate to="/login" replace />, 
  },
  {
    path: "/login",
    element: <InfoLogin />,
  },
  { 
    path: "/home",
      element: (
        <AuthGuard>
          <Root />
        </AuthGuard>
      ),

    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path:"categoria",
        element: <Categoria />,
      },
      {
        path:"productos",
        element:<Products />,
      },
      {
        path:"lote",
        element:<Lote/>,
      },
      {
        path:"inventario",
        element: <Inventario/>,
      },
      {
        path:"realizar-venta",
        element: <Ventas/>,
      },
      {
        path:"add-cliente",
        element:<Cliente/>,
      },
      {
        path:"cancelar-venta",
        element:<CancelVenta/>
      },
      {
        path:"facturas",
        element:<Facturaciones/>,
      },
      {
        path:"guia-remision",
        element:<GuiaRemision/>
      },
      {
        path:"anular-comprobantes",
        element:<AnularComprobantes/>,
      }
    ],

  },
]);