import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useCategoriaStore } from "../../categoria/store/categoria-store";
import { Field } from "../../../common/components/field/field";
import { createProducto } from "../services/post-product";

export function ProductPage(){

    const [saved, setSaved] = useState(false);
    const [form, setForm] = useState({
        nombreProducto: "",
        marca: "",
        descripcion: "",
        categoria: "", 
        precioUnidad: "",
        precioCaja: "",
        precioCajon: "",
        unidad_caja: "",
        caja_cajon: "",
       /*  stockMin: "", */
        
    });
    const { categorias } = useCategoriaStore();
    const set = (field) => (e) => {
      setForm({ ...form, [field]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos del producto a enviar:", form);
        createProducto(form);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return(
    <div className="p-6 max-w-2xl font-sans" >
      <div className="mb-6">
        <h1 className="font-black text-foreground tracking-tight">AGREGAR PRODUCTO</h1>
        <p className="text-muted-foreground text-sm font-mono" >NUEVO REGISTRO EN CATÁLOGO</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-950/40 border border-green-800/50 px-4 py-3 mb-6">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-400 font-mono" >PRODUCTO REGISTRADO CORRECTAMENTE</span>
        </div>
      )}

            <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
 {/*          <Field label="Código">
            <input type="text" className={inputCls} placeholder="ELE-009" value={form.codigo} onChange={set("codigo")} style={MONO} />
          </Field> */}
          <Field label="Categoría">
            <select className="form-input font-mono" value={form.categoria} onChange={set("categoria")}>
              <option value="">— seleccione —</option>
              {categorias.map((c) => (
                <option key={c.idCategoria} value={c.idCategoria}>{c.nombreCategoria}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Nombre del Producto">
          <input type="text" className="form-input" placeholder="Ej. CEPILLO DENTAL" value={form.nombreProducto} onChange={set("nombreProducto")} />
        </Field>       

        <div className="grid grid-cols-2 gap-4">
          <Field label="Marca del Producto">
            <input type="text" className="form-input" placeholder="Ej. KOLGATE" value={form.marca} onChange={set("marca")} />
          </Field>    
          <Field label="Precio unitario (S/)">
            <input type="number" min="0" step="0.01" className="form-input  font-mono" placeholder="0.00" value={form.precioUnidad} onChange={set("precioUnidad")} />
          </Field>
          <Field label="Precio Caja (S/)">
            <input type="number" min="0" step="0.01" className="form-input font-mono" placeholder="0.00" value={form.precioCaja} onChange={set("precioCaja")}  />
          </Field>
          <Field label="Precio Cajon (S/)">
            <input type="number" min="0" step="0.01" className="form-input font-mono" placeholder="0.00" value={form.precioCajon} onChange={set("precioCajon")}  />
          </Field>
          <Field label="Unidad Caja">
            <input type="number"  className="form-input font-mono" placeholder="5 valor entero" value={form.unidad_caja} onChange={set("unidad_caja")}  />
          </Field>
          <Field label="Caja Cajon">
            <input type="number"  className="form-input font-mono" placeholder="6 valor entero" value={form.caja_cajon} onChange={set("caja_cajon")}  />
          </Field>          
        </div>

{/*         <Field label="Stock mínimo de alerta">
          <input type="number" min="0" className={inputCls} placeholder="10" value={form.stockMin} onChange={set("stockMin")} style={MONO} />
        </Field>
 */}
        <Field label="Descripción">
          <textarea
            rows={3}
            className="w-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
            placeholder="Descripción breve del producto..."
            value={form.descripcion}
            onChange={set("descripcion")}
          />
        </Field>

        <div className="pt-2 flex gap-3">
          <button
            type="submit"
            className="bg-primary text-primary-foreground font-black text-sm tracking-[0.15em] uppercase px-8 py-3 hover:bg-amber-400 transition-colors"
          >
            REGISTRAR PRODUCTO
          </button>
          <button
            type="reset"
            onClick={() => setForm({nombreProducto: "",marca: "",descripcion: "", categoria: "", precioUnidad: "", precioCaja: "",
              precioCajon: "", unidad_caja:"", caja_cajon:""
              })}
            className="border border-border text-muted-foreground text-sm px-6 py-3 hover:border-foreground hover:text-foreground transition-colors"
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
    );
}