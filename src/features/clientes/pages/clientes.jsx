import { useState } from "react";
import { Field } from "../../../common/components/field/field";
import { usePostAddClientes } from "../hooks/use-post-add-client";
import { CheckCircle, RefreshCw, AlertTriangle } from "lucide-react";
import { useGetAllClients } from "../hooks/use-get-all-client";
export function ClientesPages(){


    const [saved, setSaved] = useState(false);
    const inputCls = "w-full bg-card border border-border text-foreground placeholder:text-muted-foreground px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
    const MONO = { fontFamily: "'Share Tech Mono', monospace" };

    const { cliente,loading:loadingPost, error:errorPost, ejecutarPost } = usePostAddClientes();
    const {clientes, loading:loadingGet,error:errorGet, refetch}= useGetAllClients();

    const [form, setForm] = useState({
        nombreCliente: "",
        numeroDNI: "",
        numeroRUC: "",
        razonSocial: "", 
        direccion: "",
        email: "",
    });

    const set = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await ejecutarPost(form);
        await refetch();
        setForm({ nombreCliente: "", numeroDNI: "", numeroRUC: "", razonSocial: "", direccion: "", email: "" });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };


    const filtered = clientes|| [];

    return(
    
    <div className="p-6 max-w-2xl" style={{ fontFamily: "'Barlow', sans-serif" }}>
      <div className="mb-6">
        <h1 className="font-black text-foreground tracking-tight">AGREGAR CLIENTE</h1>
        <p className="text-muted-foreground text-sm font-mono" >NUEVO REGISTRO EN CATÁLOGO</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-950/40 border border-green-800/50 px-4 py-3 mb-6">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-400 font-mono" >CLIENTE REGISTRADO CORRECTAMENTE</span>
        </div>
      )}
{errorPost && (
                <div className="flex items-center gap-2 bg-destructive/20 border border-destructive/50 px-4 py-3 mb-6">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-sm text-destructive font-mono uppercase">ERROR: {errorPost}</span>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">

        <Field label="Nombre COMPLETO DEL CLIENTE">
          <input type="text" className={inputCls} placeholder="Ej. JOSE MARQUEZ" value={form.nombreCliente} onChange={set("nombreCliente")} />
        </Field>       

        <div className="grid grid-cols-2 gap-4">
          <Field label="Numero de DNI">
            <input type="text" className={inputCls} placeholder="Ej. 12345678" value={form.numeroDNI} onChange={set("numeroDNI")} />
          </Field>    
          <Field label="Numero de RUC">
            <input type="text" className={inputCls} placeholder="EJ 10123456785" value={form.numeroRUC} onChange={set("numeroRUC")} style={MONO} />
          </Field>
          <Field label="Razon Social">
            <input type="text" className={inputCls} placeholder="clinica Jesus" value={form.razonSocial} onChange={set("razonSocial")} style={MONO} />
          </Field>
          <Field label="Direccion">
            <input type="text"  className={inputCls} placeholder="call/av./jr " value={form.direccion} onChange={set("direccion")} style={MONO} />
          </Field>
          <Field label="Email">
            <input type="text"  className={inputCls} placeholder="email123@gmail.com" value={form.email} onChange={set("email")} style={MONO} />
          </Field>         
        </div>


        <div className="pt-2 flex gap-3">
          <button
            type="submit"
            disabled={loadingPost}
            className="bg-primary text-primary-foreground font-black text-sm tracking-[0.15em] uppercase px-8 py-3 hover:bg-amber-400 transition-colors"
          >
           {loadingPost ? "GUARDANDO..." : "REGISTRAR CLIENTE"}
          </button>
          <button
            type="reset"
            disabled={loadingPost}
            onClick={() => setForm({nombreCliente: "",numeroDNI: "",numeroRUC: "", razonSocial: "", direccion: "", email: ""})}
            className="border border-border text-muted-foreground text-sm px-6 py-3 hover:border-foreground hover:text-foreground transition-colors"
          >
            Limpiar
          </button>
        </div>
      </form>

            <div className="flex justify-between items-center mt-14 mb-4">
                <h2 className="text-xs font-bold text-muted-foreground font-mono tracking-wider uppercase">
                    Clientes en el Sistema ({filtered.length})
                </h2>
                <button
                    type="button"
                    onClick={() => refetch && refetch()}
                    disabled={loadingGet}
                    className="flex items-center gap-2 text-xs font-mono border border-border bg-card px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors disabled:opacity-50"
                >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingGet ? "animate-spin" : ""}`} />
                    {loadingGet ? "ACTUALIZANDO..." : "REFRESCAR"}
                </button>
            </div>
            <table className="w-full text-sm min-w-[700px]">
                <thead>
                    <tr className="border-b border-border bg-muted">
                    {["ID CLIENTE", "NOMBRE", "DNI","RUC", "RAZON SOCIAL", "DIRECCION", "EMAIL", "FECHA DE CREACION"].map((h) => (
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
                        <tr key={p.idCliente} className="border-b border-border last:border-0 hover:bg-card transition-colors">
                            <td className="px-4 py-2.5 text-primary" style={MONO}>{p.idCliente}</td>
                            <td className="px-4 py-2.5 text-foreground font-medium">{p.nombreCliente}</td>
                            <td className="px-4 py-2.5 text-muted-foreground">{p.numeroDNI}</td>
                            <td className="px-4 py-2.5 text-muted-foreground" style={MONO}>{p.numeroRUC}</td>
                            <td className="px-4 py-2.5 text-muted-foreground" style={MONO}>{p.razonSocial}</td>
                            <td className="px-4 py-2.5 text-muted-foreground" style={MONO}>{p.direccion}</td>
                            <td className="px-4 py-2.5 text-muted-foreground" style={MONO}>{p.email}</td>
                            <td className="px-4 py-2.5 text-muted-foreground" style={MONO}>{p.fechaCreacionCliente}</td>
                        </tr>
                        );
                    })
                    )}
                </tbody>
            </table>
        </div>
    );

}