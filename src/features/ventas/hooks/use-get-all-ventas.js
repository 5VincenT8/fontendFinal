import { useCallback, useEffect, useState } from "react"
import { getAllVentas } from "../services/get-all-ventas";


export function useGetAllVentas (){
const [ventasObtenidas, setVentasObtenidas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useCallback permite llamar a esta función desde fuera del hook
    const fetchVentas = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getAllVentas();
            setVentasObtenidas(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchVentas();
    }, [fetchVentas]);

    return { error, loading, ventasObtenidas, refetch: fetchVentas };
}
