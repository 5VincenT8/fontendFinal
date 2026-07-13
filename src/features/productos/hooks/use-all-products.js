import { useEffect, useState } from "react"
import { getAllProducts } from "../services/get-all-products";

export function useGetAllProduts (){
    const [products,setProducts]= useState(null)
    const [loading,setLoading]=useState(true)
    const [error, setError]= useState(null)

    useEffect(()=>{
          getAllProducts()
          .then(setProducts)
          .catch((error)=>setError(error.message))
          .finally(()=>setLoading(false));  
    },[]);

    return{ error, loading, products}
}

