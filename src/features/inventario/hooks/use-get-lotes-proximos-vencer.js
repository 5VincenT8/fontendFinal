import { useEffect, useState } from "react"
import { getLotesProximosVencidos } from "../services/get-lotes-a-vencer";


export function useGetLotesProximosVencer(dias){
    const [lotesProxVencer,setLotesProxVencer]= useState(null)
    const [loading,setLoading]=useState(true)
    const [error, setError]= useState(null)

    useEffect(()=>{
     
        if (!dias || dias === "") {
        setLotesProxVencer([]);
        setLoading(false);
        return; 
        }
        setLoading(true);

        getLotesProximosVencidos(dias)
        .then(setLotesProxVencer)
        .catch((error)=>setError(error.message))
        .finally(()=>setLoading(false));  
    },[dias]);

    return{ error, loading, lotesProxVencer}
}

