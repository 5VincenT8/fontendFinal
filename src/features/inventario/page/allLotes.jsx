import { useGetAllLotes } from "../hooks/use-get-all-lotes";

export function AllLotes (){
    
    const MONO = { fontFamily: "'Share Tech Mono', monospace" };
    const inputCls = "w-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
    const {lotes, loading,error}= useGetAllLotes();

    const filtered = lotes || [];
    if (loading) return <div>Cargando inventario...</div>;
    if (error) return <div>Error: {error}</div>;
    

    return (
    <div className="p-6 space-y-5" style={{ fontFamily: "'Barlow', sans-serif" }}>
        <div>
        
        <p className="text-muted-foreground text-sm" style={MONO}>
          {lotes.length} LOTES REGISTRADOS
        </p>
      </div>

    <div className="border border-border overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-border bg-muted">
              {["CÓDIGO", "NOMBRE", "LOTE","VENCIMIENTO", "STOCK UNIDAD", "STOCK CAJA", "STOCK  CAJON"].map((h) => (
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