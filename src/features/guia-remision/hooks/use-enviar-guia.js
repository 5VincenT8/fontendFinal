import { useEffect, useState } from "react"
import { EnviarGuia } from "../services/post-enviar-guia";



export function usePostEnviarGuia (){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [respuesta, setRespuesta] = useState(null);

    const ejecutarPostEnviarGuia = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const resultado = await EnviarGuia(data);
            setRespuesta(resultado); // Retornamos la respuesta para que el componente sepa que tuvo éxito
        } catch (err) {
            setError(err.message);
            throw err; // Lanzamos el error para atraparlo en el componente si es necesario
        } finally {
            setLoading(false);
        }
    };

    return { respuesta,loading, error, ejecutarPostEnviarGuia};
}