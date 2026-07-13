import { useEffect, useState } from "react"
import { getReporteProducts } from "../services/get-all-product-stock";


export function useGetReportProducts (){
    const [products,setProducts]= useState(null)
    const [loading,setLoading]=useState(true)
    const [error, setError]= useState(null)

    useEffect(()=>{
          getReporteProducts()
          .then(setProducts)
          .catch((error)=>setError(error.message))
          .finally(()=>setLoading(false));  
    },[]);

    return{ error, loading, products}
}

