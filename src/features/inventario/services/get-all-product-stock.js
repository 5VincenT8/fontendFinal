import { API_BASE_URL } from "../../../common/api/api-config";

export const getReporteProducts = async()=>{
    const response= await fetch (`${API_BASE_URL}/inventario/stockTotal`,{
        method: "GET", 
        headers: {
        "Content-Type": "application/json",
    },
    credentials: "include", 
    });

    if (!response.ok) {
   
    const errorText = await response.text();
    throw new Error(errorText || "Error obtener Reporte de los productos");
    }

    return response.json();
}