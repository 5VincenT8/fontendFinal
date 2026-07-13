import { useState } from "react";
import { useGetLotesProximosVencer } from "../hooks/use-get-lotes-proximos-vencer";
import { Field } from "../../../common/components/field/field";

export function LotesPoximosVencer(){
    
    const MONO = { fontFamily: "'Share Tech Mono', monospace" };
    const inputCls = "w-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
    
    const [saved, setSaved] = useState(false);

    const [selectedDias, setSelectedDias] = useState("");
    // 2. Estado real que disparará la búsqueda en el hook
    const [searchDias, setSearchDias] = useState("");

    const { lotesProxVencer, loading, error } = useGetLotesProximosVencer(searchDias);
    

    const filtered = lotesProxVencer || [];

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!selectedDias) return;
        setSearchDias(selectedDias);

    };
    
    return(
        <div className="p-6 max-w-2xl" style={{ fontFamily: "'Barlow', sans-serif" }}>
            <form onSubmit={handleSearch} className="space-y-5">
            <Field label="Producto">
                <input className={inputCls}
                    type="number"
                    min="1"
                    placeholder="Ejm. 30"
                    value={selectedDias} 
                    onChange={(e) => setSelectedDias(e.target.value)}
                    style={MONO}>
                </input>
            </Field>
            <button 
                    type="submit" 
                    className="bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors h-[42px] rounded-sm disabled:opacity-50"
                    /*  disabled={loadingLotes} */
                >
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </form>

            <div className="border border-border overflow-x-auto">
                <table className="w-full text-sm min-w-[700px]">
                    <thead>
                        <tr className="border-b border-border bg-muted">
                        {["CÓDIGO", "NOMBRE", "LOTE","FECHA DE VENCIMIENTO", "STOCK TOTAL UNIDAD", "STOCK EN CAJAS","STOCK EN CAJON" ].map((h) => (
                            <th key={h} className="px-4 py-2.5 text-left text-xs text-muted-foreground" style={MONO}>{h}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            // 1. Si está cargando, muestra este mensaje
                            <tr>
                                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground text-sm" style={MONO}>
                                    CARGANDO LOTES VENCIDOS DESDE EL SERVIDOR...
                                </td>
                            </tr>
                        ) : filtered.length === 0 ? (
                            // 2. Si ya terminó de cargar y no hay nada, muestra esto
                            <tr>
                                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground text-sm" style={MONO}>
                                    SIN RESULTADOS
                                </td>
                            </tr>
                        ) : (
                        filtered.map((p) => {
                            
                            return (
                            <tr key={`${p.idProduct}-${p.idLote}`} className="border-b border-border last:border-0 hover:bg-card transition-colors">
                                <td className="px-4 py-2.5 text-primary" style={MONO}>{p.idProduct}</td>
                                <td className="px-4 py-2.5 text-foreground font-medium">{p.nombreProduct}</td>
                                <td className="px-4 py-2.5 text-muted-foreground">{p.idLote}</td>
                                <td className="px-4 py-2.5 text-muted-foreground" style={MONO}>{p.fechaVencimiento}</td>
                                <td className="px-4 py-2.5 text-muted-foreground" style={MONO}>{p.stockLote}</td>
                                <td className="px-4 py-2.5 text-muted-foreground" style={MONO}>{p.stockLoteCaja}</td>
                                <td className="px-4 py-2.5 text-muted-foreground" style={MONO}>{p.stockLoteCajon}</td>
                            </tr>
                            );
                        })
                        )}
                    </tbody>
                </table>
            </div>    
        </div>    
    );

    
}