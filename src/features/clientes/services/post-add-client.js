import { API_BASE_URL } from "../../../common/api/api-config";

export const createClient = async(data)=>{

   
    const response=await fetch(`${API_BASE_URL}/clientes`,{
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
    body: JSON.stringify(data), 
    });

    if (!response.ok) {
   
    const errorText = await response.text();
    throw new Error(errorText || "Error al agregar un nuevo cliente");
  }

    return response.json();
};
