import { VITA_API_BASE_URL } from "../../../common/api/api-config";

export const getLoteByIdProduct = async(idProduct)=>{
    const response= await fetch (`${VITA_API_BASE_URL}/inventario/lote/${idProduct}`,{
        method: "GET", 
        headers: {
        "Content-Type": "application/json",
    },
    credentials: "include", 
    });

    if (!response.ok) {
   
    const errorText = await response.text();
    throw new Error(errorText || "Error obtener los lotes de este producto");
    }

    return response.json();
}