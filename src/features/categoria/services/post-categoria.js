import { VITA_API_BASE_URL } from "../../../common/api/api-config";

export const crearCategoria = async(data)=>{

   
    const response=await fetch(`${VITA_API_BASE_URL}/categoria`,{
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
    body: JSON.stringify(data), 
    });

    if (!response.ok) {
   
    const errorText = await response.text();
    throw new Error(errorText || "Error al crear la categoría");
  }

    return response.json();
};
