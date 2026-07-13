import { useState } from "react";
import { useGetAllProduts } from "../../productos/hooks/use-all-products";
import { useGetLoteByIdProduct } from "../hooks/use-get-lote-by-id";
import { Field } from "../../../common/components/field/field";

export function LoteByIdProduct(){

    const MONO = { fontFamily: "'Share Tech Mono', monospace" };
    const inputCls = "w-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
    
    const [saved, setSaved] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState("");

    const [searchProductId, setSearchProductId] = useState("");
    const { lotesProduct, loading: loadingLotes, error: errorLotes } = useGetLoteByIdProduct(searchProductId);
    const { products, loading: loadingProducts, error: errorProducts } = useGetAllProduts(); 
    
    console.log("1. ¿Qué ID se está seleccionando?:", selectedProductId);
    console.log("2. ¿Qué datos están llegando de los lotes?:", lotesProduct);
    const filtered = lotesProduct || [];

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!selectedProductId) return;
        setSearchProductId(selectedProductId);

    };

    return(
        <div className="p-6 max-w-auto" style={{ fontFamily: "'Barlow', sans-serif" }}>
            <form onSubmit={handleSearch} className="space-y-5">
            <Field label="Producto">
                <select className={inputCls}
                 value={selectedProductId} 
                 onChange={(e) => setSelectedProductId(e.target.value)}
                  style={MONO}>
                <option value="">— seleccione producto —</option>
                {products?.map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
                </select>
            </Field>
            <button 
                    type="submit" 
                    className="bg-primary text-primary-foreground px-8 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors h-[42px] rounded-sm disabled:opacity-50"
                    disabled={loadingLotes} 
                >
                    {loadingLotes ? "Buscando..." : "Buscar"}
                </button>
            </form>

            <div className="border border-border overflow-x-auto mt-3">
                <table className="w-full text-sm min-w-[700px]">
                    <thead>
                        <tr className="border-b border-border bg-muted">
                        {["CÓDIGO", "NOMBRE", "LOTE","FECHA DE VENCIMIENTO", "STOCK TOTAL UNIDAD", "STOCK EN CAJAS","STOCK EN CAJON" ].map((h) => (
                            <th key={h} className="px-4 py-2.5 text-left text-xs text-muted-foreground" style={MONO}>{h}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loadingLotes ? (
                           
                            <tr>
                                <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground text-sm" style={MONO}>
                                    CARGANDO LOTES DESDE EL SERVIDOR...
                                </td>
                            </tr>
                        ) : filtered.length === 0 ? (
                            
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
                                <td className="px-4 py-2.5 text-muted-foreground" style={MONO}>{Number(p.stockLoteCaja).toFixed(2)}</td>
                                <td className="px-4 py-2.5 text-muted-foreground" style={MONO}>{Number(p.stockLoteCajon).toFixed(2)}</td>
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