import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useGetAllVentas } from "../hooks/use-get-all-ventas";
import { usePostCancelVenta } from "../hooks/use-post-cancel-venta";


export function CancelVentaPage() {
    const MONO = { fontFamily: "'Share Tech Mono', monospace" };

    // 1. Consumimos tus hooks personalizados (eliminamos el useState duplicado)
    // Usamos alias (:) en useGetAllVentas para evitar choques de nombres
    const { ejecutarPostCancelVenta } = usePostCancelVenta();
    const { ventasObtenidas: ventas, loading, error, refetch } = useGetAllVentas(); 

    // Mantenemos un estado de carga local solo para la acción de anular
    const [isAnulando, setIsAnulando] = useState(false);

    // 2. Función para anular una venta específica usando tu hook
    const handleAnularVenta = async (idVenta, montoTotal) => {
        const confirmar = window.confirm(
            `¿Estás seguro de que deseas ANULAR la venta #${idVenta} por un total de S/ ${montoTotal.toFixed(2)}?`
        );
        if (!confirmar) return;

        setIsAnulando(true);
        try {
            // Ejecutamos la cancelación pasándole el ID de la venta
            const response=await ejecutarPostCancelVenta(idVenta);
            alert(response?.data?.message || "Venta anulada exitosamente.");
            
            // Si tu hook de listado tiene una función para recargar (ej: refetch o cargarVentas) la llamamos
            if (refetch) {
                refetch();
            } else {
                // Si no, forzamos una recarga limpia para actualizar los estados visuales en la tabla
                window.location.reload();
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
        <div className="min-h-screen bg-black text-zinc-100 p-6 font-sans">
            <div className="max-w-6xl mx-auto">
                
                {/* Encabezado */}
                <div className="mb-8 border-b border-zinc-800 pb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold tracking-wide text-amber-500">HISTORIAL Y ANULACIÓN DE VENTAS</h1>
                        <p className="text-xs text-zinc-400 font-mono mt-1 uppercase">Visualiza todas las ventas registradas y gestiona anulaciones</p>
                    </div>
                    <button 
                        onClick={refetch || (() => window.location.reload())}
                        disabled={loading || isAnulando}
                        className="bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 px-4 py-2 border border-zinc-800 rounded transition disabled:opacity-50"
                    >
                        {loading ? 'ACTUALIZANDO...' : 'REFRESCAR LISTA'}
                    </button>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-950/40 border border-red-900 rounded text-red-400 text-xs font-mono uppercase">
                        ⚠️ {error}
                    </div>
                )}

                {/* Tabla con todas las ventas */}
                <div className="bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-zinc-500 font-mono text-xs uppercase tracking-wider">
                            Cargando registros de ventas...
                        </div>
                    ) : !ventas || ventas.length === 0 ? (
                        <div className="p-12 text-center text-zinc-500 font-mono text-xs uppercase tracking-wider">
                            No hay ninguna venta registrada en el sistema.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs font-mono text-zinc-300">
                                <thead className="bg-zinc-900 text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                                    <tr>
                                        <th className="py-3 px-4">ID VENTA</th>
                                        <th className="py-3 px-4">CLIENTE (ID)</th>
                                        <th className="py-3 px-4">DOC. EMITIDO</th>
                                        <th className="py-3 px-4">SERIE</th>
                                        <th className="py-3 px-4 text-right">TOTAL</th>
                                        <th className="py-3 px-4 text-center">ESTADO</th>
                                        <th className="py-3 px-4 text-center">ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-900">
                                    {ventasOrdenadas.map((v) => (
                                        <tr key={v.idVenta} className="hover:bg-zinc-900/40 transition">
                                            <td className="py-4 px-4 text-white font-bold" style={MONO}>#{v.idVenta}</td>
                                            <td className="py-4 px-4 text-zinc-400">{v.idCliente || 'N/A'}</td>
                                            <td className="py-4 px-4">{v.tipoDocumento || 'BOLETA'}</td>
                                            <td className="py-4 px-4 text-zinc-500" style={MONO}>{v.serie || '---'}</td>
                                            <td className="py-4 px-4 text-right text-amber-500 font-bold" style={MONO}>
                                                S/ {v.montoTotal ? v.montoTotal.toFixed(2) : '0.00'}
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                                    v.estado === 'ANULADO' 
                                                        ? 'bg-red-950/50 text-red-400 border-red-900' 
                                                        : 'bg-emerald-950/50 text-emerald-400 border-emerald-900'
                                                }`}>
                                                    {v.estado || 'REGISTRADO'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                {v.estado === 'ANULADO' ? (
                                                    <div className="flex items-center justify-center gap-1 text-zinc-600 text-[11px] uppercase tracking-wider">
                                                        <CheckCircle className="w-3.5 h-3.5 text-zinc-600" />
                                                        Ya Anulado
                                                    </div>
                                                ) : (
                                                    <button 
                                                        onClick={() => handleAnularVenta(v.idVenta, v.montoTotal || 0)}
                                                        disabled={isAnulando}
                                                        className="bg-red-950/40 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1 rounded border border-red-900 hover:border-red-600 transition text-[11px] font-bold uppercase tracking-wider disabled:opacity-50"
                                                    >
                                                        {isAnulando ? '...' : 'Anular'}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}