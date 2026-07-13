import { useEffect, useState } from "react";
import { getPreviewGuia } from "../services/get-preview-guia";


export function useGetPreviewGuia(idVenta){
    
    const [guiaPreview, setGuiaPreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    const cargarPreviewGuia = (idVenta) => {
        if (!idVenta) return;
        setLoading(true);
        getPreviewGuia(idVenta)
        .then(setGuiaPreview)
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));  
    };

    useEffect(() => {
        if (idVenta) {
            cargarPreviewGuia(idVenta);
        }
    }, [idVenta]);
    
    return { error, loading, guiaPreview, refetch: cargarPreviewGuia }; 
}