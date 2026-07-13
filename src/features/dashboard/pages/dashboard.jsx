import { ConsultaRapidaGuia } from "../../../common/components/consultas-rapidas/consulta-guia-rapida";
import {  Package, PackagePlus, Layers, FolderPlus,
  ShoppingCart, Ban, Truck, Receipt, FileText,
  AlertTriangle, TrendingUp, Tag, Box,
  } from "lucide-react"
import {Link} from "react-router-dom";  
import { StatCard } from "../../../common/components/stat-card/stat-card";
import { useCategoriaStore } from "../../categoria/store/categoria-store";
import { useGetReportProducts } from "../../inventario/hooks/use-get-reporte-products";
import { useGetAllVentas } from "../../ventas/hooks/use-get-all-ventas";
import { navGroups } from "../../../common/components/sidebar/nav-config";
import { useGetAllClients } from "../../clientes/hooks/use-get-all-client";
const MONO = { fontFamily: "'Share Tech Mono', monospace" };

export function DashboardPage(){
    
    const { error:errProd, loading:loadProd, products}=useGetReportProducts();
    const {error:errVent, loading:loadVent, ventasObtenidas, refetch: fetchVentas}= useGetAllVentas();
    const {categorias, setCategorias, addCategoria}=useCategoriaStore();
    const{clientes}=useGetAllClients();
    const quickLinks=navGroups.flatMap(group => group.items);
    const COLOR_MAP = {
    "/home/inventario": "text-amber-400",
    "/home/productos":  "text-blue-400",
    "/home/lote":"text-purple-400", 
    "/home/categoria":"text-green-400",
    "/home/realizar-venta": "text-amber-400",
    "/home/cancelar-venta":"text-red-400",
    "/home/guia-remision": "text-cyan-400",
    "/home/anular-comprobantes":"text-red-400",
    "/home/facturas": "text-green-400",
    "/home/add-cliente":"text-purple-400",
    };

    console.log("Datos de productos:", { loadProd, products });
    const hoyFiltro = new Date().toISOString().split('T')[0];

    const ventasHoy = (ventasObtenidas || []).filter(v => v.fechaEmision?.startsWith(hoyFiltro));
    const totalHoy = ventasHoy.reduce((acc, v) => acc + (Number(v.montoTotal) || 0), 0);
    const productBajoSotck  = (products||[]).filter(p=>p.stockTotal<=100);
    const alertas=productBajoSotck.length;

return (
    <div className="p-6 space-y-6" style={{ fontFamily: "'Barlow', sans-serif" }}>
      
      <div>
        <h1 className="font-black text-foreground tracking-tight">PANEL PRINCIPAL</h1>
        <p className="text-muted-foreground text-sm" style={MONO}>
          {new Date().toLocaleDateString("es-PE", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).toUpperCase()}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          icon={<Box className="w-5 h-5 text-amber-400" />}
          label="PRODUCTOS"
          value={loadProd ? "..." : String(products?.length || 0)}
          sub="registrados"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5 text-green-400" />}
          label="VENTAS HOY"
          value={loadVent ? "..." : `S/ ${totalHoy.toFixed(2)}`}
          sub={`${ventasHoy.length} transacciones`}
        />
        <StatCard
          icon={<Tag className="w-5 h-5 text-blue-400" />}
          label="CATEGORÍAS"
          value={String(categorias.length)}
          sub="activas"
        />
        <StatCard
          icon={<AlertTriangle className="w-5 h-5 text-red-400" />}
          label="ALERTAS STOCK"
          value={String(alertas)}
          sub="bajo mínimo"
          highlight={alertas > 0}
        />
    </div>

    {alertas > 0 && (
    <div className="bg-red-950/30 border border-red-800/40 p-4">
        <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-red-400" />
        <span className="text-xs font-semibold text-red-400 tracking-widest" style={MONO}>
            ALERTA DE STOCK BAJO
        </span>
        </div>
        <div className="space-y-1.5">
        {productBajoSotck.map((p) => (
            <div key={p.idProduct} className="flex items-center justify-between text-sm">
            <span className="text-foreground">{p.nombre} — <span className="text-foreground">{p.marca}</span>
            </span>
            <span className="text-red-400" style={MONO}>
                {p.stockTotal} unidades - {p.totalCajas} cajas - {p.totalCajones} cajones — mín. {100}
            </span>
            </div>
        ))}
        </div>
    </div>
    )}

        <div>
            <div className="text-xs text-muted-foreground tracking-widest mb-3" style={MONO}>ACCESO RÁPIDO</div>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
            {quickLinks.map(({ path, icon: Icon, label, color }) => (
                <Link
                key={path}
                to={path}
                className="flex flex-col items-center gap-2 p-3 bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors text-center group"
                >
                <Icon className={`w-5 h-5 ${COLOR_MAP[path]} group-hover:scale-110 transition-transform`} />
                <span className="text-xs text-muted-foreground group-hover:text-foreground leading-tight">{label.toUpperCase()}</span>
                </Link>
            ))}
            </div>
        </div>
      
        <div className="text-xs text-muted-foreground tracking-widest mb-3" style={MONO}>CONSULTA RÁPIDA
        </div>    
        <div className="max-w-md">
            <ConsultaRapidaGuia />
        </div>

        <div className="text-xs text-muted-foreground tracking-widest mb-3" style={MONO}>VENTAS RECIENTES</div>
        <div className="border border-border overflow-hidden rounded-lg">
        <table className="w-full text-sm">
            <thead>
            <tr className="border-b border-border bg-muted/50">
                {["N° VENTA", "FECHA", "CLIENTE", "ITEMS", "TOTAL", "ESTADO"].map((h) => (
                <th 
                    key={h} 
                    // Si el header es "ITEMS", aplicamos text-center
                    className={`px-4 py-2.5 text-left text-xs text-muted-foreground ${h === "ITEMS" ? "text-center" : ""}`} 
                    style={MONO}
                >
                    {h}
                </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {(ventasObtenidas || []).slice(-5).reverse().map((v) => (
                <tr key={v.idVenta} className="border-b border-border last:border-0 hover:bg-card/50 transition-colors">
                <td className="px-4 py-2.5 text-primary" style={MONO}>{v.idVenta}</td>
                <td className="px-4 py-2.5 text-muted-foreground" style={MONO}>
                    {new Date(v.fechaEmision).toLocaleDateString()}
                </td>
                <td className="px-4 py-2.5 text-foreground">
                    {clientes.find(c => c.idCliente === v.idCliente)?.nombreCliente || "S/C"}
                </td>
                {/* Aquí aplicamos text-center y la fuente mono para que los números estén alineados */}
                <td className="px-4 py-2.5 text-muted-foreground text-center" style={MONO}>
                    {v.detalles?.length || 0}
                </td>
                <td className="px-4 py-2.5 text-foreground font-semibold" style={MONO}>
                    S/ {Number(v.montoTotal).toFixed(2)}
                </td>
                <td className="px-4 py-2.5">
                    <span
                    className={`text-[10px] px-2 py-0.5 rounded ${
                        v.estado === "REGISTRADO"
                        ? "bg-green-950/30 text-green-400 border border-green-800/40"
                        : "bg-red-950/30 text-red-400 border border-red-800/40"
                    }`}
                    style={MONO}
                    >
                    {v.estado?.toUpperCase()}
                    </span>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>



    </div>
    );
}