import { Trash2 } from "lucide-react";

export function DetallesTablaSection({ formVenta, products, productosPrecios, eliminarDelDetalle, MONO }) {
    return (
        <div className="border border-border overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-border bg-muted">
                        <th className="hidden sm:table-cell px-4 py-2 text-left text-xs text-muted-foreground font-mono">ID PROD</th>
                        <th className="px-4 py-2 text-left text-xs text-muted-foreground font-mono">NOMBRE DEL PRODUCTO</th>
                        <th className="px-4 py-2 text-left text-xs text-muted-foreground font-mono">TIPO UNIDAD</th>
                        <th className="px-4 py-2 text-left text-xs text-muted-foreground font-mono">CANTIDAD</th>
                        <th className="px-4 py-2 text-right text-xs text-muted-foreground font-mono">PRECIO UNIT.</th>
                        <th className="px-4 py-2 text-right text-xs text-muted-foreground font-mono">TOTAL</th>
                        <th className="px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {formVenta.detalles.length === 0 ? (
                        <tr>
                           
                            <td colSpan={7} className="px-4 py-6 text-center text-muted-foreground text-xs font-mono">
                                DETALLES VACÍOS - AGREGA PRODUCTOS
                            </td>
                        </tr>
                    ) : (
                        formVenta.detalles.map((item, index) => {
                            
                            const prodAsociado = products?.find(
                                (p) => String(p.idProduct || p.idProducto) === String(item.idProducto)
                            );
                            
                            const prodPrecio = productosPrecios?.find(
                                (p) => String(p.id) === String(item.idProducto)
                            );

                            const nombreParaMostrar = prodAsociado?.nombre || prodAsociado?.nombreProducto || "Buscando nombre...";

                            
                            let precioPresentacion = 0;
                            if (item.tipoUnidad === "UNIDAD") precioPresentacion = prodPrecio?.precioUnidad || 0;
                            if (item.tipoUnidad === "CAJA") precioPresentacion = prodPrecio?.precioCaja || 0;
                            if (item.tipoUnidad === "CAJON") precioPresentacion = prodPrecio?.precioCajon || 0;

                        
                            const totalFila = precioPresentacion * parseInt(item.cantProducto, 10);

                            return (
                                <tr key={index} className="border-b border-border last:border-0 hover:bg-card/50 transition-colors">
                                  
                                    <td className="hidden sm:table-cell px-4 py-2 text-primary text-xs" style={MONO}>
                                        {item.idProducto}
                                    </td>
                                    
                                    <td className="px-4 py-2 text-foreground font-medium text-[10px] max-w-[120px] truncate">
                                        {nombreParaMostrar}
                                    </td>
                                    <td className="px-2 py-2 text-muted-foreground text-[10px] font-mono">
                                        {item.tipoUnidad}
                                    </td>
                                    <td className="px-4 py-2 text-foreground font-bold text-xs" style={MONO}>
                                        {item.cantProducto}
                                    </td>
                                    
                                    <td className="px-4 py-2 text-muted-foreground text-xs text-right" style={MONO}>
                                        S/ {Number(precioPresentacion).toFixed(2)}
                                    </td>
                                    <td className="px-4 py-2 text-amber-400 font-bold text-xs text-right" style={MONO}>
                                        S/ {Number(totalFila).toFixed(2)}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        <button 
                                            type="button" 
                                            onClick={() => {
                                                if (window.confirm("¿Estás seguro de quitar este producto?")) {
                                                    eliminarDelDetalle(item.idProducto);
                                                }
                                            }}
                                            className="text-destructive hover:text-red-400 transition-colors p-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}