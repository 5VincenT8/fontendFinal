import { useState } from "react";
import { Field } from "../../../common/components/field/field";
import { usePostAnularComprobante } from "../hooks/use-post-anular-comprobante";

export function AnularComprobantesPage() {
    const MONO = { fontFamily: "'Share Tech Mono', monospace" };
    const inputCls = "w-full bg-card border border-border text-foreground px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";

    // Estados para los campos del formulario
    const [formData, setFormData] = useState({
        operacion: "generar_anulacion",
        tipo_de_comprobante: "",
        numero: "",
        motivo: ""
    });

    const { loading, error, ejecutarPostAnularComprobante } = usePostAnularComprobante();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ejecutarPostAnularComprobante(formData);
            alert("Comprobante anulado con éxito");
            // Aquí podrías limpiar el formulario si lo deseas
        } catch (err) {
            console.error("Error al anular:", err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="p-6 max-w-3xl" style={{ fontFamily: "'Barlow', sans-serif" }}>
            <div className="mb-5">
                <h1 className="font-black text-foreground tracking-tight">ANULAR COMPROBANTES</h1>
                <p className="text-muted-foreground text-sm" style={MONO}>BOLETAS/FACTURAS</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-card border border-border p-5 space-y-4">
                    <div className="text-xs text-muted-foreground tracking-widest" style={MONO}>ENCABEZADO</div>
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="OPERACION">
                            <input type="text" className={`${inputCls}  cursor-not-allowed`} value={"generar_anulacion"} disabled onChange={handleChange} style={MONO} />
                        </Field>
                        <Field label="TIPO DE COMPROBANTE">
                            <input name="tipo_de_comprobante" type="number" className={inputCls} onChange={handleChange} style={MONO} placeholder="ejm: 1:Boleta 2:Factura" />
                        </Field>
                        <Field label="SERIE">
                            <input name="serie" type="text" className={inputCls} onChange={handleChange} style={MONO} placeholder="ejm: B001 o F001" />
                        </Field>
                        <Field label="NUMERO DEL COMPROBANTE">
                            <input name="numero" type="number" className={inputCls} onChange={handleChange} style={MONO} placeholder="Ejm: 1"/>
                        </Field>
                        <Field label="MOTIVO">
                            <input name="motivo" type="text" className={inputCls} onChange={handleChange} style={MONO} placeholder="Escribe el motivo de la anulación..." />
                        </Field>
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-primary text-primary-foreground px-6 py-2 font-bold hover:opacity-90 disabled:opacity-50"
                >
                    {loading ? "ANULANDO..." : "CONFIRMAR ANULACIÓN"}
                </button>
            </form>
        </div>
    );
}