import { useState } from "react";
import { Field } from "../../../common/components/field/field";
import { usePostAddClientes } from "../hooks/use-post-add-client";
import { CheckCircle, RefreshCw, AlertTriangle } from "lucide-react";
import { useGetAllClients } from "../hooks/use-get-all-client";

export function ClientesPages(){

    const [saved, setSaved] = useState(false);

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

return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto font-sans text-foreground">
            
            <div className="mb-8">
                <h1 className="font-black text-2xl md:text-3xl tracking-tight">AGREGAR CLIENTE</h1>
                <p className="text-muted-foreground text-sm font-mono uppercase">Nuevo registro en catálogo</p>
            </div>

            
            {saved && (
                <div className="flex items-center gap-2 bg-green-950/40 border border-green-800/50 px-4 py-3 mb-6">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400 font-mono">CLIENTE REGISTRADO CORRECTAMENTE</span>
                </div>
            )}
            {errorPost && (
                <div className="flex items-center gap-2 bg-destructive/20 border border-destructive/50 px-4 py-3 mb-6">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-sm text-destructive font-mono uppercase">ERROR: {errorPost}</span>
                </div>
            )}

            
            <form onSubmit={handleSubmit} className="space-y-5 bg-card p-6 border border-border rounded-lg shadow-sm">
                <Field label="Nombre COMPLETO DEL CLIENTE">
                    <input type="text" className="form-input" placeholder="Ej. JOSE MARQUEZ" value={form.nombreCliente} onChange={set("nombreCliente")} />
                </Field>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Numero de DNI"><input type="text" className="form-input" placeholder="Ej. 12345678" value={form.numeroDNI} onChange={set("numeroDNI")} /></Field>
                    <Field label="Numero de RUC"><input type="text" className="form-input" placeholder="Ej. 10123456785" value={form.numeroRUC} onChange={set("numeroRUC")} /></Field>
                    <Field label="Razon Social"><input type="text" className="form-input" placeholder="Clinica Jesus" value={form.razonSocial} onChange={set("razonSocial")} /></Field>
                    <Field label="Direccion"><input type="text" className="form-input" placeholder="Calle/Av./Jr." value={form.direccion} onChange={set("direccion")} /></Field>
                    <Field label="Email"><input type="text" className="form-input" placeholder="email123@gmail.com" value={form.email} onChange={set("email")} /></Field>
                </div>

                <div className="pt-2 flex gap-3">
                    <button type="submit" disabled={loadingPost} className="bg-primary text-primary-foreground font-black text-sm tracking-[0.15em] uppercase px-8 py-3 hover:opacity-90 transition-opacity">
                        {loadingPost ? "GUARDANDO..." : "REGISTRAR CLIENTE"}
                    </button>
                    <button type="reset" disabled={loadingPost} onClick={() => setForm({nombreCliente: "", numeroDNI: "", numeroRUC: "", razonSocial: "", direccion: "", email: ""})} className="border border-border text-muted-foreground text-sm px-6 py-3 hover:border-foreground transition-colors">
                        Limpiar
                    </button>
                </div>
            </form>

          
            <div className="flex justify-between items-center mt-14 mb-4">
                <h2 className="text-xs font-bold text-muted-foreground font-mono tracking-wider uppercase">Clientes en el Sistema ({filtered.length})</h2>
                <button type="button" onClick={() => refetch()} disabled={loadingGet} className="flex items-center gap-2 text-xs font-mono border border-border bg-card px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50">
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingGet ? "animate-spin" : ""}`} /> {loadingGet ? "ACTUALIZANDO..." : "REFRESCAR"}
                </button>
            </div>

          
            <div className="overflow-x-auto border border-border rounded-lg">
                <table className="w-full text-sm min-w-[800px]">
                    <thead>
                        <tr className="border-b border-border bg-muted/50">
                            {["ID", "NOMBRE", "DNI", "RUC", "RAZÓN SOCIAL", "DIRECCIÓN", "EMAIL", "FECHA"].map((h) => (
                                <th key={h} className="px-4 py-3 text-left text-xs text-muted-foreground font-mono">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground font-mono">SIN RESULTADOS</td></tr>
                        ) : (
                            filtered.map((p) => (
                                <tr key={p.idCliente} className="border-b border-border last:border-0 hover:bg-card transition-colors">
                                    <td className="px-4 py-3 font-mono text-primary">{p.idCliente}</td>
                                    <td className="px-4 py-3 text-foreground font-medium">{p.nombreCliente}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{p.numeroDNI}</td>
                                    <td className="px-4 py-3 font-mono text-muted-foreground">{p.numeroRUC}</td>
                                    <td className="px-4 py-3 font-mono text-muted-foreground">{p.razonSocial}</td>
                                    <td className="px-4 py-3 font-mono text-muted-foreground">{p.direccion}</td>
                                    <td className="px-4 py-3 font-mono text-muted-foreground">{p.email}</td>
                                    <td className="px-4 py-3 font-mono text-muted-foreground">{p.fechaCreacionCliente}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}