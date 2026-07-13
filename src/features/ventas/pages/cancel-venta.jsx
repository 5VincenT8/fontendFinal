import { useState } from "react";
import { CheckCircle, RefreshCw, AlertTrianglev } from "lucide-react";
import { useGetAllVentas } from "../hooks/use-get-all-ventas";
import { usePostCancelVenta } from "../hooks/use-post-cancel-venta";


export function CancelVentaPage() {
  
    const { ejecutarPostCancelVenta } = usePostCancelVenta();
    const { ventasObtenidas: ventas, loading, error, refetch } = useGetAllVentas();    
    const [isAnulando, setIsAnulando] = useState(false);

    const handleAnularVenta = async (idVenta, montoTotal) => {
        
        if (!window.confirm(`¿Estás seguro de que deseas ANULAR la venta #${idVenta} por S/ ${montoTotal.toFixed(2)}?`)) return;

        setIsAnulando(true);

        try {
            const response=await ejecutarPostCancelVenta(idVenta);
            alert(response?.data?.message || "Venta anulada exitosamente.");
            if (refetch) {
               await refetch();
            } 
        } catch (err) {
            console.error("Error al anular:", err);
            alert("Ocurrió un error al intentar anular la venta.");
        } finally {
            setIsAnulando(false);
        }
    };
    const ventasOrdenadas = [...ventas].sort((a, b) => b.idVenta - a.idVenta);

    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto font-sans text-foreground">
           
            <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <h1 className="font-black text-2xl tracking-tight">GESTIÓN DE VENTAS</h1>
                    <p className="text-muted-foreground text-sm font-mono uppercase">Historial y anulación de comprobantes</p>
                </div>
                <button 
                    onClick={refetch}
                    disabled={loading || isAnulando}
                    className="flex items-center justify-center gap-2 bg-card border border-border px-4 py-2 text-xs font-bold font-mono hover:bg-muted transition-colors disabled:opacity-50"
                >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                    {loading ? 'ACTUALIZANDO...' : 'REFRESCAR LISTA'}
                </button>
            </div>

            {error && (
                <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 px-4 py-3 mb-6 text-destructive text-sm font-mono">
                    <AlertTriangle className="w-4 h-4" />
                    {error}
                </div>
            )}

            {/* Tabla */}
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 border-b border-border">
                            <tr>
                                {["ID VENTA", "CLIENTE", "DOC.", "SERIE", "TOTAL", "ESTADO", "ACCIONES"].map((h) => (
                                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-muted-foreground font-mono">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {ventasOrdenadas.map((v) => (
                                <tr key={v.idVenta} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3 font-mono font-bold text-primary">#{v.idVenta}</td>
                                    <td className="px-4 py-3">{v.idCliente || 'N/A'}</td>
                                    <td className="px-4 py-3 font-mono">{v.tipoDocumento || 'BOLETA'}</td>
                                    <td className="px-4 py-3 font-mono text-muted-foreground">{v.serie || '---'}</td>
                                    <td className="px-4 py-3 font-mono font-bold text-right">S/ {v.montoTotal?.toFixed(2) || '0.00'}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 text-[10px] font-bold rounded-full border ${
                                            v.estado === 'ANULADO' 
                                                ? 'bg-destructive/10 text-destructive border-destructive/20' 
                                                : 'bg-green-500/10 text-green-600 border-green-500/20'
                                        }`}>
                                            {v.estado || 'REGISTRADO'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {v.estado === 'ANULADO' ? (
                                            <div className="flex items-center justify-center gap-1 text-muted-foreground text-xs">
                                                <CheckCircle className="w-3.5 h-3.5" /> Ya Anulado
                                            </div>
                                        ) : (
                                            <button 
                                                onClick={() => handleAnularVenta(v.idVenta, v.montoTotal || 0)}
                                                disabled={isAnulando}
                                                className="bg-destructive text-destructive-foreground hover:opacity-90 px-3 py-1 rounded text-xs font-bold transition-opacity disabled:opacity-50"
                                            >
                                                {isAnulando ? '...' : 'ANULAR'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}