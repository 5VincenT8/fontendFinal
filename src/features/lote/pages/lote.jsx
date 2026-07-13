import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { Field } from "../../../common/components/field/field";
import { useGetAllProduts } from "../../productos/hooks/use-all-products";
import { createLote } from "../services/post-lote";

export function LotePage(){

    const MONO = { fontFamily: "'Share Tech Mono', monospace" };
    const inputCls = "w-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
    
    const [saved, setSaved] = useState(false);

    const [form, setForm] = useState({
    idProduct: "",
    idLote: "",
    fechaVencimiento: "",
    stockLote: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos del lote a enviar:", form);
        createLote(form);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const { products, loading, error } = useGetAllProduts();

    if (loading) return <div>Cargando productos...</div>;
    if (error) return <div>Error: {error}</div>;

    const set = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });
    };


    return (
    <div className="p-6 max-w-2xl" style={{ fontFamily: "'Barlow', sans-serif" }}>
      <div className="mb-6">
        <h1 className="font-black text-foreground tracking-tight">AGREGAR LOTE</h1>
        <p className="text-muted-foreground text-sm" style={MONO}>INGRESO DE NUEVO LOTE DE STOCK</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-950/40 border border-green-800/50 px-4 py-3 mb-6">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-400" style={MONO}>LOTE REGISTRADO CORRECTAMENTE</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Producto">
          <select className={inputCls} value={form.idProduct} onChange={set("idProduct")} style={MONO}>
            <option value="">— seleccione producto —</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </Field>
          

        <div className="grid grid-cols-2 gap-4">
          <Field label="NUMERO DE LOTE">
            <input type="number" min="1" className={inputCls} placeholder="1" value={form.idLote} onChange={set("idLote")} style={MONO} />
          </Field>
          <Field label="STOCK EN UNITARIO">
            <input type="number" min="0" step="1" className={inputCls} placeholder="15" value={form.stockLote} onChange={set("stockLote")} style={MONO} />
          </Field>
        </div>


          <Field label="Fecha de Vencimiento (obligatorio)">
            <input type="date" className={inputCls} value={form.fechaVencimiento} onChange={set("fechaVencimiento")} style={MONO} />
          </Field>




        <div className="pt-2 flex gap-3">
          <button type="submit" className="bg-primary text-primary-foreground font-black text-sm tracking-[0.15em] uppercase px-8 py-3 hover:bg-amber-400 transition-colors">
            REGISTRAR LOTE
          </button>
          <button type="button" 
    onClick={() => setForm({
        idProduct: "",
        idLote: "",
        fechaVencimiento: "",
        stockLote: "",
    })} className="border border-border text-muted-foreground text-sm px-6 py-3 hover:border-foreground hover:text-foreground transition-colors">
            Limpiar
          </button>
        </div>        
    </form>
    </div>    
    );
}