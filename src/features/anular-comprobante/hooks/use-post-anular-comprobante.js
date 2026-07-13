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
            return respuesta; 
        } catch (err) {
            setError(err.message);
            throw err; 
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, ejecutarPostAnularComprobante };
}
