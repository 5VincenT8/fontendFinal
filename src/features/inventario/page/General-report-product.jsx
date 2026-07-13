import { useGetReportProducts } from "../hooks/use-get-reporte-products";

export function ReporteProducts(){

    const MONO = { fontFamily: "'Share Tech Mono', monospace" };
    const inputCls = "w-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";

    const {products, loading,error}= useGetReportProducts();

    const filtered = products || [];
    if (loading) return <div>Cargando reporte...</div>;
    if (error) return <div>Error: {error}</div>;

    return(  
        
    <div className="p-6 space-y-5" style={{ fontFamily: "'Barlow', sans-serif" }}>
        <div>
        <p className="text-muted-foreground text-sm" style={MONO}>
          {products.length} PRODUCTOS REGISTRADOS
        </p>
        </div>

        <div className="border border-border overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
                <thead>
                    <tr className="border-b border-border bg-muted">
                    {["CÓDIGO", "NOMBRE", "MARCA","PRECIO UNIDAD", "STOCK TOTAL UNIDAD", "CATEGORIA", "STOCK EN CAJAS","STOCK EN CAJON" ].map((h) => (
                        <th key={h} className="px-4 py-2.5 text-left text-xs text-muted-foreground" style={MONO}>{h}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {filtered.length === 0 ? (
                    <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground text-sm" style={MONO}>
                        SIN RESULTADOS
                        </td>
                    </tr>
                    ) : (
                    filtered.map((p) => {
                        
                        return (
                        <tr key={p.idProduct} className="border-b border-border last:border-0 hover:bg-card transition-colors">
                            <td className="px-4 py-2.5 text-primary" style={MONO}>{p.idProduct}</td>
                            <td className="px-4 py-2.5 text-foreground font-medium">{p.nombre}</td>
                            <td className="px-4 py-2.5 text-muted-foreground">{p.marca}</td>
                            <td className="px-4 py-2.5 text-muted-foreground" style={MONO}>{p.precioUnidad}</td>
                            <td className="px-4 py-2.5 text-muted-foreground" style={MONO}>{p.stockTotal}</td>
                            <td className="px-4 py-2.5 text-muted-foreground" style={MONO}>{p.nombreCategoria}</td>
                            <td className="px-4 py-2.5 text-muted-foreground" style={MONO}>{p.totalCajas}</td>
                            <td className="px-4 py-2.5 text-muted-foreground" style={MONO}>{p.totalCajones}</td>
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