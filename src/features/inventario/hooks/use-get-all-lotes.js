import { useEffect, useState } from "react"
import { getAllLotes } from "../services/get-all-Lotes";

export function useGetAllLotes (){
    const [lotes,setLotes]= useState(null)
    const [loading,setLoading]=useState(true)
    const [error, setError]= useState(null)

    useEffect(()=>{
          getAllLotes()
          .then(setLotes)
          .catch((error)=>setError(error.message))
          .finally(()=>setLoading(false));  
    },[]);

    return{ error, loading, lotes}
}

