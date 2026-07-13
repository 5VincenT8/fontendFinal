import { useEffect, useState } from "react"
import { CancelVentaById } from "../services/post-cancel-venta";

export function usePostCancelVenta (){
const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const ejecutarPostCancelVenta = async (idVenta) => {
        setLoading(true);
        setError(null);

        try {
            const respuesta = await CancelVentaById(idVenta);
            return respuesta; // Retornamos la respuesta para que el componente sepa que tuvo éxito
        } catch (err) {
            setError(err.message);
            throw err; // Lanzamos el error para atraparlo en el componente si es necesario
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, ejecutarPostCancelVenta };
}
