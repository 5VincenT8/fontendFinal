import { useState } from "react";
import { useCategoriaStore } from "../store/categoria-store";
import { crearCategoria } from "../services/post-categoria";
import { CheckCircle,Tag } from "lucide-react";


export function CategoriaPage(){

    const [nombreCategoria, setNombre] = useState("");
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const {categorias,addCategoria}=useCategoriaStore()


    const handleSubmit = async (e) => {
        console.log("Submit iniciado");
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Llamada al servicio (la API)
      const data = await crearCategoria({nombreCategoria}); 
      
      // 2. Si sale bien, actualizamos el estado global (el store)
      addCategoria(data);
      
      setNombre("");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      alert("Error capturado: " + error.message);
    } finally {
      setLoading(false);
    }
  };

    

    return(
        <>
    <div className="p-6 max-w-2xl" style={{ fontFamily: "'Barlow', sans-serif" }}>
      <div className="mb-6">
        <h1 className="font-black text-foreground tracking-tight">AGREGAR CATEGORÍA</h1>
        <p className="text-muted-foreground text-sm font-mono" >NUEVA CATEGORÍA DE PRODUCTOS</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-950/40 border border-green-800/50 px-4 py-3 mb-6">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-400 font-mono" >CATEGORÍA REGISTRADA CORRECTAMENTE</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 mb-8">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground font-mono" >Nombre</label>
          <input
            type="text"
            className="w-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            placeholder="Ej. HIGIENE PERSONAL"
            value={nombreCategoria}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
{/*         <div className="space-y-1.5">
          <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground font-mono" >Descripción (opcional)</label>
          <textarea
            rows={2}
            className="w-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
            placeholder="Descripción breve..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div> */}
        <button type="submit" className="bg-primary text-primary-foreground font-black text-sm tracking-[0.15em] uppercase px-8 py-3 hover:bg-amber-400 transition-colors">
          {loading ? "REGISTRANDO..." : "REGISTRAR CATEGORÍA"}
        </button>
      </form>

            <div>
        <div className="text-xs text-muted-foreground tracking-widest mb-3 font-mono" >
          CATEGORÍAS EXISTENTES — {categorias.length}
        </div>
        <div className="space-y-2">
          {categorias.map((c) => (
            <div key={c.idCategoria} className="flex items-center gap-3 bg-card border border-border px-4 py-3">
              <Tag className="w-4 h-4 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground ">{c.nombreCategoria}</div>
              </div>
              <span className="text-xs text-muted-foreground font-mono" >{c.idCategoria}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>

    ) ;
}