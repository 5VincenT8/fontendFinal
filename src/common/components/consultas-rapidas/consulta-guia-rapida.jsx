import { useState } from "react";
import { GuiaConsulta } from "../form-guia-consulta/form-consulta-guia";

export function ConsultaRapidaGuia() {
    const [numero, setNumero] = useState("");
    const [abrirModal, setAbrirModal] = useState(false);
    const SERIE_FIJA = "T001";

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Consultando serie T001 y número:", numero);
        if (numero) {
            setAbrirModal(true);
        } else {
            alert("Por favor ingresa un número de guía");
        }
        
    };

    return (
        <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
            <h2 className="font-bold text-lg mb-4">Consultar Guía de Remisión</h2>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input 
                    disabled 
                    value={SERIE_FIJA} 
                    className="w-20 px-3 py-2 bg-muted border rounded text-center" 
                />
                <input 
                    type="number" 
                    placeholder="Número (ej: 5)"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    className="flex-1 px-3 py-2 bg-background border rounded"
                />
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded font-bold">
                    BUSCAR
                </button>
            </form>

            {abrirModal && (
                <GuiaConsulta 
                    serie={SERIE_FIJA} 
                    numero={numero} 
                    onClose={() => setAbrirModal(false)} 
                />
            )}
        </div>
    );
}