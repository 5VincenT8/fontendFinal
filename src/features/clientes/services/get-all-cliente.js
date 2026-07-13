import { API_BASE_URL } from "../../../common/api/api-config";

export const getAllClient = async()=>{

   
    const response=await fetch(`${API_BASE_URL}/clientes/all`,{
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
    });

    if (!response.ok) {
   
    const errorText = await response.text();
    throw new Error(errorText || "Error al obtener a los clientes");
  }

    return response.json();
};
