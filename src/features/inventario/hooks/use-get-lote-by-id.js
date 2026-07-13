import { useEffect, useState } from "react"
import { getLoteByIdProduct } from "../services/get-Lote-By-Product";


export function useGetLoteByIdProduct(idProduct){
    const [lotesProduct,setLotesProduct]= useState(null)
    const [loading,setLoading]=useState(true)
    const [error, setError]= useState(null)

    useEffect(()=>{
     
        if (!idProduct || idProduct === "") {
        setLotesProduct([]);
        setLoading(false);
        return; 
        }
        setLoading(true);

        getLoteByIdProduct(idProduct)
        .then(setLotesProduct)
        .catch((error)=>setError(error.message))
        .finally(()=>setLoading(false));  
    },[idProduct]);

    return{ error, loading, lotesProduct}
}

