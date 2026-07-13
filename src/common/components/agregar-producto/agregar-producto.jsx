import { Plus } from "lucide-react";
import { SearchableProductSelect } from "../SearchableProductSelect/SearchableProductSelect";


export function AgregarProductoSection({ 
    products, 
    handleProductoSeleccionado, 
    resetProdTrigger, 
    tmpProducto, 
    setTmpProducto, 
    loadingProds, 
    agregarAlDetalle, 
    obtenerStockDisponible, 
    inputCls, 
    MONO 
}) {
    return (
        <div className="border border-border p-4 bg-card/10 mt-6">
            <h3 className="text-xs font-bold text-muted-foreground font-mono uppercase mb-4 tracking-wider text-primary">
                AÑADIR PRODUCTOS
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                
                <div className="sm:col-span-6">
                    <SearchableProductSelect
                        productos={products || []} 
                        onSelectProduct={handleProductoSeleccionado}
                        resetTrigger={resetProdTrigger}
                    />
                </div>

                <div className="sm:col-span-3">
                    <label className="block text-[10px] font-mono text-muted-foreground uppercase mb-1">Tipo Unidad</label>
                    <select 
                        className={inputCls} 
                        value={tmpProducto.tipoUnidad} 
                        onChange={e => setTmpProducto({...tmpProducto, tipoUnidad: e.target.value})}
                    >
                        <option value="UNIDAD">UNIDAD</option>
                        <option value="CAJA">CAJA</option>
                        <option value="CAJON">CAJON</option>
                    </select>
                </div>

                
                <div className="sm:col-span-3">
                    <label className="block text-[10px] font-mono text-muted-foreground uppercase mb-1">Cant. Producto</label>
                    <div className="flex gap-2">
                        <input 
                            type="number" 
                            min="1" 
                            placeholder={loadingProds ? "..." : "0"} 
                            disabled={loadingProds}
                            className={inputCls} 
                            style={MONO} 
                            value={tmpProducto.cantProducto} 
                            onChange={e => setTmpProducto({...tmpProducto, cantProducto: e.target.value})} 
                        />
                        <button 
                            type="button" 
                            onClick={() => {
                             agregarAlDetalle();
    }} 
                            className="bg-primary text-primary-foreground p-2.5 hover:bg-amber-400 transition-colors"
                        >
                            <Plus className="w-5 h-5 stroke-[3]" />
                        </button>
                    </div>
                </div>
            </div>

            {tmpProducto.idProducto && products && (
                <div className="mt-3 text-[11px] font-mono text-muted-foreground bg-muted/40 px-3 py-1.5 border border-border/60 text-right">
                    <span>
                        STOCK DISPONIBLE:{" "}
                        <span className="text-primary font-bold">
                            {obtenerStockDisponible()} {tmpProducto.tipoUnidad}S
                        </span>
                    </span>
                </div>
            )}
        </div>
    );
}