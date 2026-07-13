import { useEffect, useState } from "react"
import { createClient } from "../services/post-add-client";



export function usePostAddClientes (){
    const [cliente,setCliente]= useState(null);
    const [loading,setLoading]=useState(false);
    const [error, setError]= useState(null);


    const ejecutarPost = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const respuesta = await createClient(data);
            setCliente(respuesta);
            return respuesta;   
        } catch (err) {
            setError(err.message);
            throw err; 
        } finally {
            setLoading(false);
        }
    };

    
    return { cliente, loading, error, ejecutarPost };
}
