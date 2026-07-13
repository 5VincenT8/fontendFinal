import { useState,useEffect } from "react";
import { CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { useGetAllVentas } from "../../ventas/hooks/use-get-all-ventas";
import { usePostEnviarFacturacion } from "../hooks/use-enviar-facturacion";
import { useGetPreviewFacturacion } from "../hooks/use-preview-facturacion";
import { FacturaForm } from "../../../common/components/factura-form/factura-form";

export function FacturacionesPages() {

    const MONO = { fontFamily: "'Share Tech Mono', monospace" };
    const inputCls = "w-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";

  
    const [idVenta, setIdVenta] = useState(null);

    const [resultadoFactura, setResultadoFactura] = useState(null);

    const { 
        ventasObtenidas, 
        loading: loadingVentas, 
        error: errorVentas, 
        refetch: fetchVentas 
    } = useGetAllVentas();

    const { 
        facturaPreview, 
        loading: loadingPreview, 
        error: errorPreview 
    } = useGetPreviewFacturacion(idVenta); 

    const { 
        ejecutarPostEnviarFacturacion, 
        loading: loadingEnvio, 
        error: errorEnvio, 
        respuesta,
        resetRespuesta, 
    } = usePostEnviarFacturacion();

    const handleSeleccionarVenta = (idVenta) => {
        setIdVenta(idVenta);
    };

    const handleEnviarFactura = async (formData) => {
        try {
            await ejecutarPostEnviarFacturacion(formData);
            alert("Factura generada correctamente");
        } catch (err) {
            console.error("Fallo al facturar:", err);
            alert("Error al enviar: " + err.message);
        }
    };
    const ventasFiltradas = (ventasObtenidas || [])
        .filter(v => v.estado === "REGISTRADO") 
        .sort((a, b) => b.idVenta - a.idVenta);
    
    const esBoleta = respuesta?.serie?.startsWith("B");
    const comprobanteValido = respuesta?.aceptada_por_sunat || esBoleta;

    return (
        <div className="p-4 md:p-6 max-w-3xl mx-auto text-foreground" style={{ fontFamily: "'Barlow', sans-serif" }}>
            
            <div className="mb-8">
                <h1 className="font-black text-2xl md:text-3xl tracking-tight text-foreground">COMPROBANTE ELECTRÓNICO</h1>
                <p className="text-muted-foreground text-sm mt-1 font-mono" >EMISIÓN DE COMPROBANTE ELECTRÓNICO</p>
            </div>

            {respuesta ? (
                
                <div className="bg-card p-6 md:p-8 rounded-lg shadow-sm border border-border text-center animate-in fade-in zoom-in duration-300">
                    {comprobanteValido ? (
                        <>
                            <CheckCircle2 className="mx-auto text-green-500 mb-4" size={64} />
                            <h2 className="font-black text-2xl mb-2 text-foreground">¡Comprobante Emitido!</h2>
                            <div className="my-6 p-4 border border-green-200 rounded-lg bg-green-50/50 max-w-md mx-auto">
                                <span className="text-green-700 font-bold text-xs bg-green-200 px-3 py-1 rounded-full uppercase tracking-wider">
                                    {esBoleta ? "Boleta Generada" : "Aceptada por SUNAT"}
                                </span>
                                <p className="text-green-800 text-sm mt-3 font-medium">{respuesta.sunat_description}</p>
                            </div>
                            <a 
                                href={respuesta.enlace_del_pdf || `${respuesta.enlace}.pdf`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 px-8 rounded-md hover:opacity-90 transition-opacity mb-8 shadow-md"
                            >
                                <FileText size={20} /> Ver / Imprimir Documento
                            </a>
                        </>
                    ) : (
                        <>
                            <AlertCircle className="mx-auto text-red-500 mb-4" size={64} />
                            <h2 className="font-black text-2xl mb-2 text-foreground">Problema con SUNAT</h2>
                            <div className="my-6 p-4 border border-red-200 rounded-lg bg-red-50 max-w-md mx-auto">
                                <span className="text-red-700 font-bold text-xs bg-red-200 px-3 py-1 rounded-full uppercase tracking-wider">Rechazada</span>
                                <p className="text-red-800 text-sm mt-3 font-medium">{respuesta.sunat_description || "El comprobante no pudo ser validado."}</p>
                                {respuesta.sunat_soap_error && (
                                    <p className="text-xs text-red-600 mt-2 bg-red-100 p-2 rounded">Error: {respuesta.sunat_soap_error}</p>
                                )}
                            </div>
                        </>
                    )}
                    <div className="mt-4 border-t border-border pt-4">
                        <button onClick={() => {setIdVenta(null); resetRespuesta();}} className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors underline">
                            Volver a Ventas Pendientes
                        </button>
                    </div>
                </div>
            ) : !idVenta ? (
                
                <div className="bg-card p-4 md:p-6 rounded-lg shadow-sm border border-border">
                    <h2 className="font-bold text-lg mb-4 border-b border-border text-foreground pb-2">Ventas Pendientes</h2>
                    {loadingVentas && <p className="text-primary animate-pulse">Cargando ventas...</p>}
                    
                    <div className="flex flex-col gap-3 mt-4">
                        {ventasFiltradas.map(v => (
                            <button 
                                key={v.idVenta} 
                                onClick={() => handleSeleccionarVenta(v.idVenta)}
                                className="group text-left px-4 py-4 bg-background hover:bg-accent border border-border rounded-md transition-all flex flex-wrap gap-2 justify-between items-center"
                            >
                                <span className="font-bold text-foreground w-full md:w-auto">Venta #{v.idVenta}</span>
                                <div className="flex gap-4 text-xs font-mono text-muted-foreground">
                                    <span>{v.serie}-{v.correlativo}</span>
                                    <span>{v.fechaEmision}</span>
                                </div>
                                <span className="text-primary font-bold text-lg tracking-wide">S/ {v.montoTotal}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                
                <div>
                    <button onClick={() => setIdVenta(null)} className="mb-4 text-sm font-semibold text-primary hover:underline flex items-center gap-2">
                        ← Volver a la lista
                    </button>
                    {loadingPreview ? (
                        <div className="p-10 text-center text-muted-foreground bg-card rounded-lg border border-border">
                            <p className="animate-pulse">Cargando datos...</p>
                        </div>
                    ) : (
                        <FacturaForm data={facturaPreview} onEnviar={handleEnviarFactura} isSubmitting={loadingEnvio} />
                    )}
                </div>
            )}
        </div>
    );
}