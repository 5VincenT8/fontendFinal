import { useEffect, useState } from "react"
import { getLotesVencidos } from "../services/get-Lotes-Vencidos";


export function useGetLotesVencidos (){
    const [vencidos,setvencidos]= useState(null)
    const [loading,setLoading]=useState(true)
    const [error, setError]= useState(null)

    useEffect(()=>{
          getLotesVencidos()
          .then(setvencidos)
          .catch((error)=>setError(error.message))
          .finally(()=>setLoading(false));  
    },[]);

    return{ error, loading, vencidos}
}

