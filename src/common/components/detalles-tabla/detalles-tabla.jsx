import { Trash2 } from "lucide-react";

// 1. Agregamos "productosPrecios" a las propiedades que recibe el componente
export function DetallesTablaSection({ formVenta, products, productosPrecios, eliminarDelDetalle, MONO }) {
    return (
        <div className="border border-border overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-border bg-muted">
                        {/* 2. Añadimos las cabeceras de PRECIO UNIT. y TOTAL */}
                        {["ID PROD", "NOMBRE DEL PRODUCTO", "TIPO UNIDAD", "CANTIDAD", "PRECIO UNIT.", "TOTAL", ""].map((h) => (
                            <th key={h} className="px-4 py-2 text-left text-xs text-muted-foreground font-mono">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {formVenta.detalles.length === 0 ? (
                        <tr>
                            {/* Ajustamos el colSpan a 7 porque ahora hay más columnas */}
                            <td colSpan={7} className="px-4 py-6 text-center text-muted-foreground text-xs font-mono" style={MONO}>
                                DETALLES VACÍOS - AGREGA PRODUCTOS
                            </td>
                        </tr>
                    ) : (
                        formVenta.detalles.map((item, index) => {
                            // Cruce de datos para el stock y nombre
                            const prodAsociado = products?.find(
                                (p) => String(p.idProduct || p.idProducto) === String(item.idProducto)
                            );
                            
                            // 3. Cruce de datos con "productosPrecios" para obtener los costos reales de venta
                            const prodPrecio = productosPrecios?.find(
                                (p) => String(p.id) === String(item.idProducto)
                            );

                            const nombreParaMostrar = prodAsociado?.nombre || prodAsociado?.nombreProducto || "Buscando nombre...";

                            // 4. Lógica para determinar el precio real según la presentación
                            let precioPresentacion = 0;
                            if (item.tipoUnidad === "UNIDAD") precioPresentacion = prodPrecio?.precioUnidad || 0;
                            if (item.tipoUnidad === "CAJA") precioPresentacion = prodPrecio?.precioCaja || 0;
                            if (item.tipoUnidad === "CAJON") precioPresentacion = prodPrecio?.precioCajon || 0;

                            // 5. Calculamos el importe total de esta fila (Multiplicación directa)
                            const totalFila = precioPresentacion * parseInt(item.cantProducto, 10);

                            return (
                                <tr key={index} className="border-b border-border last:border-0 hover:bg-card/50 transition-colors">
                                    <td className="px-4 py-2 text-primary text-xs" style={MONO}>
                                        {item.idProducto}
                                    </td>
                                    
                                    <td className="px-4 py-2 text-foreground font-medium text-xs max-w-xs truncate">
                                        {nombreParaMostrar}
                                    </td>
                                    <td className="px-4 py-2 text-muted-foreground text-xs font-mono">
                                        {item.tipoUnidad}
                                    </td>
                                    <td className="px-4 py-2 text-foreground font-bold text-xs" style={MONO}>
                                        {item.cantProducto}
                                    </td>

                                    {/* 6. Renderizamos el Precio Unitario de la presentación elegida */}
                                    <td className="px-4 py-2 text-muted-foreground text-xs" style={MONO}>
                                        S/ {Number(precioPresentacion).toFixed(2)}
                                    </td>

                                    {/* 7. Renderizamos el Verdadero Total Acumulado de la fila */}
                                    <td className="px-4 py-2 text-amber-400 font-bold text-xs" style={MONO}>
                                        S/ {Number(totalFila).toFixed(2)}
                                    </td>

                                    <td className="px-4 py-2 text-right">
                                        <button 
                                            type="button" 
                                            onClick={() => eliminarDelDetalle(item.idProducto)} 
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