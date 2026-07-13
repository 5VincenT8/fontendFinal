import { useState,useEffect } from "react";
import {useGetAllVentas} from "/src/features/ventas/hooks/use-get-all-ventas.js"
import { useGetPreviewGuia } from "../hooks/use-preview-guia";
import { usePostEnviarGuia } from "../hooks/use-enviar-guia";
import { GuiaForm } from "../../../common/components/guia-form/guia-form";
import { GuiaConsulta } from "../../../common/components/form-guia-consulta/form-consulta-guia";
import { useGetAllClients } from "../../clientes/hooks/use-get-all-client";

export function GuiaRemisionPage() {

    const MONO = { fontFamily: "'Share Tech Mono', monospace" };
    const inputCls = "w-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";

    // 1. Estado para saber qué venta estamos procesando
    const [idVenta, setIdVenta] = useState(null);

    // 2. Uso de Hooks con alias (ej: loading: loadingVentas) para evitar conflictos
    const{clientes}=useGetAllClients();

    const { 
        ventasObtenidas, 
        loading: loadingVentas, 
        error: errorVentas, 
        refetch: fetchVentas 
    } = useGetAllVentas();

    const { 
        guiaPreview, 
        loading: loadingPreview, 
        error: errorPreview 
    } = useGetPreviewGuia(idVenta); // Este hook reacciona cuando idVenta cambia

    const { 
        ejecutarPostEnviarGuia, 
        loading: loadingEnvio, 
        error: errorEnvio, 
        respuesta 
    } = usePostEnviarGuia();

    // 3. Manejadores
    const handleSeleccionarVenta = (idVenta) => {
        setIdVenta(idVenta);
    };

    const handleEnviarGuia = async (formData) => {
        try {
            await ejecutarPostEnviarGuia(formData);
            alert("Guia generada correctamente , espera que la sunat acepte la peticion.");
        } catch (err) {
            console.error("Fallo realizar la guia:", err);
            alert("Error al enviar: " + err.message);
        }
    };
    const ventasFiltradas = (ventasObtenidas || [])
        .filter(v => v.estado === "REGISTRADO" ||v.estado === "FINALIZADO") // <-- Ojo: verifica que tu backend devuelva "estado" en minúsculas
        .sort((a, b) => b.idVenta - a.idVenta);
    
       
        // 4. Renderizado
    return (
        <div className="p-6 w-full max-w-7xl text-foreground" style={{ fontFamily: "'Barlow', sans-serif" }}>
            <div className="mb-8">
                <h1 className="font-black text-3xl tracking-tight text-foreground">GUIA ELECTRONICA</h1>
                <p className="text-muted-foreground text-sm mt-1" style={MONO}>EMISIÓN DE GUIA DE REMISION</p>
        </div>

            {!idVenta ? (
                <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                    <h2 className="font-bold text-lg mb-4 border-b border-border text-foreground pb-2">Ventas con Posibles Guias Pendientes</h2>
                    
                    {loadingVentas && <p className="text-primary animate-pulse">Cargando ventas...</p>}
                    
                    <div className="flex flex-col space-y-3 mt-4">
                        {ventasFiltradas.map(v => (
                            <div 
                                key={v.idVenta} 
                                className="group px-5 py-4 bg-background border border-border rounded-md transition-all flex justify-between items-center"
                            >
                                {/* Parte izquierda: Info de la venta */}
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex flex-wrap items-center gap-3 text-sm">
                                {/* ID de la Venta discreto */}
                                <span className="text-muted-foreground font-mono text-xs bg-[#252525] px-1.5 py-0.5 rounded">
                                    #{v.idVenta}
                                </span>
                                
                                {/* Serie y Correlativo resaltado como documento */}
                                <span className="font-bold text-foreground bg-[rgba(240,165,0,0.1)] border border-border px-2 py-0.5 rounded font-mono text-xs">
                                    {v.serie}-{v.correlativo}
                                </span>
                                
                                {/* Fecha de Emisión */}
                                <span className="text-muted-foreground text-xs font-mono">
                                    {v.fechaEmision.split('T')[0]}
                                </span>
                                
                                {/* Separador visual */}
                                <span className="text-muted-foreground/30 hidden sm:inline">|</span>
                                
                                {/* Nombre del Cliente en mayúsculas y destacado */}
                                <span className="font-semibold text-foreground tracking-wide uppercase text-xs sm:text-sm">
                                    {clientes.find(c => c.idCliente === v.idCliente)?.nombreCliente || "SIN CLIENTE"}
                                </span>
                            </div>

    {/* Monto Total */}
    <span className="text-primary font-bold text-xl tracking-wide">
        S/ {v.montoTotal}
    </span>
    </div>

                                {/* Parte derecha: Acciones */}
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleSeleccionarVenta(v.idVenta)}
                                        className="px-4 py-2 bg-primary text-primary-foreground rounded text-xs font-bold hover:opacity-90 transition-opacity"
                                    >
                                        GENERAR GUÍA
                                    </button>
                                </div>
                            </div>
                        ))}
                        
                    </div>

                </div>
            ) : (
                <div>
                    <button 
                        onClick={() => setIdVenta(null)}
                        className="mb-4 text-sm font-semibold text-primary hover:text-primary/80 hover:underline flex items-center gap-2 transition-colors"
                    >
                        ← Volver a la lista
                    </button>
                    
                    {loadingPreview ? (
                        <div className="p-10 text-center text-muted-foreground bg-card rounded-lg border border-border shadow-sm">
                            <p className="animate-pulse">Cargando datos de la Guia de Remision...</p>
                        </div>
                    ) : (
                        <GuiaForm 
                            data={guiaPreview} 
                            onEnviar={handleEnviarGuia} 
                            isSubmitting={loadingEnvio} 
                        />
                    )}
                </div>
            )}
        </div>
    );
}