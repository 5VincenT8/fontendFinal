import { VITA_API_BASE_URL } from "../../../common/api/api-config";

export const getLotesProximosVencidos = async(dias)=>{
    const response= await fetch (`${VITA_API_BASE_URL}/inventario/lotes/proximos-vencer/${dias}`,{
        method: "GET", 
        headers: {
        "Content-Type": "application/json",
    },
    credentials: "include", 
    });

    if (!response.ok) {
   
    const errorText = await response.text();
    throw new Error(errorText || `Error al obtener los lotes que vencen en ${dias} días.`);
    }

    return response.json();
}