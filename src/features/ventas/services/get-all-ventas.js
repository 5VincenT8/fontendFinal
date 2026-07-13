import { API_BASE_URL } from "../../../common/api/api-config";

export const getAllVentas = async()=>{

   
    const response=await fetch(`${API_BASE_URL}/ventas/all`,{
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
    });

    if (!response.ok) {
   
    const errorText = await response.text();
    throw new Error(errorText || "Error al obtener todas las ventas");
  }

    return response.json();
};
