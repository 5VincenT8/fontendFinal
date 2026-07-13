import { API_BASE_URL } from "../../../common/api/api-config";

export const getLotesVencidos = async()=>{
    const response= await fetch (`${API_BASE_URL}/inventario/lotes/vencidos`,{
        method: "GET", 
        headers: {
        "Content-Type": "application/json",
    },
    credentials: "include", 
    });

    if (!response.ok) {
   
    const errorText = await response.text();
    throw new Error(errorText || "Error obtener todos los lotes vencidos");
    }

    return response.json();
}