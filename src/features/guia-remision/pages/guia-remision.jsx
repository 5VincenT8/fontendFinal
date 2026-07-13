import { useState,useEffect } from "react";
import {useGetAllVentas} from "/src/features/ventas/hooks/use-get-all-ventas.js"
import { useGetPreviewGuia } from "../hooks/use-preview-guia";
import { usePostEnviarGuia } from "../hooks/use-enviar-guia";
import { GuiaForm } from "../../../common/components/guia-form/guia-form";
import { GuiaConsulta } from "../../../common/components/form-guia-consulta/form-consulta-guia";
import { useGetAllClients } from "../../clientes/hooks/use-get-all-client";

export function GuiaRemisionPage() {

    const inputCls = "w-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
 
    const [idVenta, setIdVenta] = useState(null);

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
    } = useGetPreviewGuia(idVenta);

    const { 
        ejecutarPostEnviarGuia, 
        loading: loadingEnvio, 
        error: errorEnvio, 
        respuesta 
    } = usePostEnviarGuia();

  
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
    

    return (
        <div className="p-6 w-full max-w-7xl text-foreground">
            <div className="mb-8">
                <h1 className="font-black text-3xl tracking-tight">GUIA ELECTRONICA</h1>
                <p className="text-muted-foreground text-sm mt-1 font-mono">EMISIÓN DE GUIA DE REMISIÓN</p>
            </div>

            {!idVenta ? (
                <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                    <h2 className="font-bold text-lg mb-4 border-b border-border pb-2">
                        Ventas con Posibles Guías Pendientes
                    </h2>
                    
                    {loadingVentas && <p className="text-primary animate-pulse">Cargando ventas...</p>}
                    
                    <div className="flex flex-col gap-3 mt-4">
                        {ventasFiltradas.map(v => (
                            <div 
                                key={v.idVenta} 
                                className="group px-4 py-4 bg-background border border-border rounded-lg transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4"
                            >
                                {/* Información de Venta */}
                                <div className="flex flex-col gap-1.5 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-muted-foreground font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded">
                                            #{v.idVenta}
                                        </span>
                                        <span className="font-bold text-primary bg-primary/10 border border-border px-2 py-0.5 rounded font-mono text-[10px]">
                                            {v.serie}-{v.correlativo}
                                        </span>
                                        <span className="text-muted-foreground text-[10px] font-mono">
                                            {v.fechaEmision.split('T')[0]}
                                        </span>
                                    </div>
                                    <span className="font-semibold text-foreground tracking-wide uppercase text-sm truncate">
                                        {clientes.find(c => c.idCliente === v.idCliente)?.nombreCliente || "SIN CLIENTE"}
                                    </span>
                                </div>

                                {/* Monto y Acción */}
                                <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-border">
                                    <span className="text-primary font-bold text-lg font-mono tracking-wide">
                                        S/ {v.montoTotal}
                                    </span>
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
                        className="mb-4 text-sm font-semibold text-primary hover:underline flex items-center gap-2"
                    >
                        ← Volver a la lista
                    </button>
                    
                    {loadingPreview ? (
                        <div className="p-10 text-center text-muted-foreground bg-card rounded-lg border border-border shadow-sm">
                            <p className="animate-pulse">Cargando datos de la Guía de Remisión...</p>
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