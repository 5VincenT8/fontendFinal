import { useEffect, useState } from "react"
import { createVenta } from "../services/post-create-venta";




export function usePostAddVenta (){
    const [venta,setVenta]= useState(null);
    const [loading,setLoading]=useState(false);
    const [error, setError]= useState(null);


    const ejecutarPostVenta = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const respuesta = await createVenta(data);
            setVenta(respuesta);
            return respuesta;   
        } catch (err) {
            setError(err.message);
            throw err; 
        } finally {
            setLoading(false);
        }
    };

    
    return { venta, loading, error, ejecutarPostVenta };
}
