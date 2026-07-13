import { useEffect, useState } from "react";
import { getConsultarGuia } from "../services/get-consultar-guia";

export function useGetConsultarGuia({ serie, numero }) {
    const [loading, setLoading] = useState(false); // <--- CAMBIO AQUÍ
    const [error, setError] = useState(null);
    const [respuesta, setRespuesta] = useState(null);

    useEffect(() => {
        if (!serie || !numero) return;

        setLoading(true);
        setError(null);
        setRespuesta(null); // Limpiar respuesta anterior

       getConsultarGuia(serie, numero)
            .then(setRespuesta)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
            
    }, [serie, numero]);

    return { respuesta, loading, error };
}