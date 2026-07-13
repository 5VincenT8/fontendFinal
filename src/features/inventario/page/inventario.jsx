import { useState } from "react";
import { Field } from "../../../common/components/field/field";
import { useGetAllLotes } from "../hooks/use-get-all-lotes";
import { AllLotes } from "./allLotes";
import { ReporteProducts } from "./General-report-product";
import { LoteByIdProduct } from "./Lote-by-id-Product";
import { LotesVencidos } from "./lotes-vencidos";
import { LotesPoximosVencer } from "./proximo-vencer";

export function InventarioPage (){

const MONO = { fontFamily: "'Share Tech Mono', monospace" };
const [vistaActiva, setVistaActiva] = useState("todos productos");

  
    
    return (<>

    <div className="p-6 space-y-5" style={{ fontFamily: "'Barlow', sans-serif" }}>
        <div>
            <h1 className="font-black text-foreground tracking-tight">INVENTARIO</h1>
        </div>
        
      </div>
    <div className="p-6 space-y-6">
        <div className="max-w-xs">
            <Field label="Filtrar Inventario">
                <select 
                    className="w-full bg-card border px-4 py-2" 
                    value={vistaActiva}
                        onChange={(e) => setVistaActiva(e.target.value)} 
                        style={MONO}
                >
                    <option value="todos productos">REPORTE GENERAL DE PRODUCTOS</option>
                    <option value="lote por producto">LOTE POR PRODUCTOS</option>
                    <option value="todos lotes">TODOS LOS LOTES</option>
                    <option value="vencidos">LOTES VENCIDOS</option>
                    <option value="proximos">PRÓXIMOS A VENCER (30 DÍAS)</option>
                </select>
            </Field>
        </div>
    </div>  
    <div >  
        {vistaActiva === "todos lotes" && <AllLotes />}
        {vistaActiva === "lote por producto" && <LoteByIdProduct />}
        {vistaActiva === "todos productos" && <ReporteProducts />}
        {vistaActiva === "vencidos" && <LotesVencidos/>}
        {vistaActiva === "proximos" && <LotesPoximosVencer />}
    </div>
      </>
    );
}