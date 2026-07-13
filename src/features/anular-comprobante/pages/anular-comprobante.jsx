import { useState } from "react";
import { Field } from "../../../common/components/field/field";
import { usePostAnularComprobante } from "../hooks/use-post-anular-comprobante";

export function AnularComprobantesPage() {
    
    const inputCls = "w-full bg-card border border-border text-foreground px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";

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

        <div className="p-6 max-w-3xl">
            <div className="mb-5">
                <h1 className="font-black text-3xl tracking-tight text-foreground">ANULAR COMPROBANTES</h1>
                <p className="text-muted-foreground text-sm font-mono">BOLETAS / FACTURAS</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-card border border-border p-5 space-y-4">
                    <div className="text-xs text-muted-foreground tracking-widest font-mono">ENCABEZADO</div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="OPERACION">
                            <input 
                                type="text" 
                                className={`${inputCls} cursor-not-allowed font-mono`} 
                                value="generar_anulacion" 
                                disabled 
                                onChange={handleChange} 
                            />
                        </Field>
                        
                        <Field label="TIPO DE COMPROBANTE">
                            <input 
                                name="tipo_de_comprobante" 
                                type="number" 
                                className={`${inputCls} font-mono`} 
                                onChange={handleChange} 
                                placeholder="1: Boleta, 2: Factura" 
                            />
                        </Field>
                        
                        <Field label="SERIE">
                            <input 
                                name="serie" 
                                type="text" 
                                className={`${inputCls} font-mono`} 
                                onChange={handleChange} 
                                placeholder="B001 / F001" 
                            />
                        </Field>
                        
                        <Field label="NUMERO">
                            <input 
                                name="numero" 
                                type="number" 
                                className={`${inputCls} font-mono`} 
                                onChange={handleChange} 
                                placeholder="Ejm: 1"
                            />
                        </Field>

                        <div className="col-span-1 md:col-span-2">
                            <Field label="MOTIVO">
                                <input 
                                    name="motivo" 
                                    type="text" 
                                    className={`${inputCls} font-mono`} 
                                    onChange={handleChange} 
                                    placeholder="Escribe el motivo de la anulación..." 
                                />
                            </Field>
                        </div>
                    </div>
                </div>

                {error && <p className="text-destructive text-sm font-semibold">{error}</p>}

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full md:w-auto bg-primary text-primary-foreground px-6 py-2 font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                    {loading ? "ANULANDO..." : "CONFIRMAR ANULACIÓN"}
                </button>
            </form>
        </div>
    );
}