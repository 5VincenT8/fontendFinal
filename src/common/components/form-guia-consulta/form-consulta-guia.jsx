import { useGetConsultarGuia } from "../../../features/guia-remision/hooks/use-consultar-guia";
import { FileDown, XCircle, Loader2, CheckCircle2 } from "lucide-react"; // Importamos iconos

export function GuiaConsulta({ serie, numero, onClose }) {
    const { respuesta, loading, error } = useGetConsultarGuia({ serie, numero });

    return (
        <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            
            <div className="bg-card p-6 rounded-lg shadow-xl border border-border w-full max-w-sm animate-in fade-in zoom-in duration-300">
                
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-primary" size={20} />
                    Guía {serie}-{numero}
                </h3>

                {loading && (
                    <div className="flex flex-col items-center py-8 text-muted-foreground">
                        <Loader2 className="animate-spin mb-2 text-primary" size={32} />
                        <p className="text-sm font-mono">Consultando servidor...</p>
                    </div>
                )}
                
                {error && (
                    <div className="text-destructive py-4 flex items-center gap-2 text-sm font-medium">
                        <XCircle size={20} />
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    respuesta?.enlace_del_pdf ? (
                        <div className="mt-4">
                            <p className="text-muted-foreground mb-4 text-sm">El documento está listo para su descarga.</p>
                            <a 
                                href={respuesta.enlace_del_pdf} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 px-4 rounded-md transition-opacity hover:opacity-90 shadow-sm"
                            >
                                <FileDown size={20} />
                                Descargar PDF
                            </a>
                        </div>
                    ) : (
                        <p className="text-muted-foreground py-4 text-sm">No se encontró información para esta guía.</p>
                    )
                )}

                <button 
                    onClick={onClose}
                    className="w-full mt-6 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors underline"
                >
                    Cerrar ventana
                </button>
            </div>
        </div>
    );
}