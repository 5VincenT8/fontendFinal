import { useEffect, useState } from "react";
import { getPreviewFacturacion } from "../services/get-preview-facturacion";

export function useGetPreviewFacturacion(idVenta){
    
    const [facturaPreview, setFacturaPreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    const cargarPreviewFact = (idVenta) => {
        if (!idVenta) return;
        setLoading(true);
        getPreviewFacturacion(idVenta)
        .then(setFacturaPreview)
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));  
    };

    useEffect(() => {
        if (idVenta) {
            cargarPreviewFact(idVenta);
        }
    }, [idVenta]);
    
    return { error, loading, facturaPreview, refetch: cargarPreviewFact }; 
}