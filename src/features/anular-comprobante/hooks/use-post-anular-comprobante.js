import { useEffect, useState } from "react"
import { postAnularComprobante } from "../services/post-anular-comprobante";

export function usePostAnularComprobante (){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const ejecutarPostAnularComprobante = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const respuesta = await postAnularComprobante(data);
            return respuesta; // Retornamos la respuesta para que el componente sepa que tuvo éxito
        } catch (err) {
            setError(err.message);
            throw err; // Lanzamos el error para atraparlo en el componente si es necesario
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, ejecutarPostAnularComprobante };
}
