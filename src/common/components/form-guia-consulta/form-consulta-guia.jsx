import { useEffect } from "react";
import { useGetConsultarGuia } from "../../../features/guia-remision/hooks/use-consultar-guia";
import { FileDown, XCircle, Loader2, CheckCircle2 } from "lucide-react"; // Importamos iconos

export function GuiaConsulta({ serie, numero, onClose }) {
    const { respuesta, loading, error } = useGetConsultarGuia({ serie, numero });

    return (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            {/* Contenedor principal con animación de entrada */}
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm animate-in fade-in zoom-in duration-300">
                
                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="text-green-500" />
                    Guía {serie}-{numero}
                </h3>

                {loading && (
                    <div className="flex flex-col items-center py-8 text-gray-500">
                        <Loader2 className="animate-spin mb-2" size={32} />
                        <p>Consultando servidor...</p>
                    </div>
                )}
                
                {error && (
                    <div className="text-red-600 py-4 flex items-center gap-2">
                        <XCircle />
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    respuesta?.enlace_del_pdf ? (
                        <div className="mt-4">
                            <p className="text-gray-600 mb-4 text-sm">El documento está listo para su descarga.</p>
                            <a 
                                href={respuesta.enlace_del_pdf} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg"
                            >
                                <FileDown size={20} />
                                Descargar PDF
                            </a>
                        </div>
                    ) : (
                        <p className="text-gray-500 py-4">No se encontró información para esta guía.</p>
                    )
                )}

                <button 
                    onClick={onClose}
                    className="w-full mt-4 text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors"
                >
                    Cerrar ventana
                </button>
            </div>
        </div>
    );
}