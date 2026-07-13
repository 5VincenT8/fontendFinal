import { useEffect, useState } from "react"
import { getAllClient } from "../services/get-all-cliente";


export function useGetAllClients (){
    const [clientes,setClientes]= useState(null)
    const [loading,setLoading]=useState(true)
    const [error, setError]= useState(null)


    const cargarClientes = () => {
        setLoading(true); // Volvemos a poner loading en true al refrescar
        getAllClient()
          .then(setClientes)
          .catch((error) => setError(error.message))
          .finally(() => setLoading(false));  
    };

    useEffect(()=>{
          cargarClientes(); 
    },[]);

    return{ error, loading, clientes,refetch: cargarClientes}
}
