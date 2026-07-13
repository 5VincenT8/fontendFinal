import { useEffect, useState } from "react"
import { EnviarFacturacion } from "../services/post-enviar-facturacion";


export function usePostEnviarFacturacion (){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [respuesta, setRespuesta] = useState(null);
    
    const ejecutarPostEnviarFacturacion = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const resultado = await EnviarFacturacion(data);
            setRespuesta(resultado); // Retornamos la respuesta para que el componente sepa que tuvo éxito
        } catch (err) {
            setError(err.message);
            throw err; // Lanzamos el error para atraparlo en el componente si es necesario
        } finally {
            setLoading(false);
        }
    };

    const resetRespuesta = () => {
        setRespuesta(null);
        setError(null);
    };

    return { respuesta,loading, error, ejecutarPostEnviarFacturacion,resetRespuesta };
}
