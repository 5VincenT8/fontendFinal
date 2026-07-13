import { API_BASE_URL } from "../../../common/api/api-config";

export const createProducto = async(data)=>{

   
    const response=await fetch(`${API_BASE_URL}/products`,{
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
    body: JSON.stringify(data), 
    });

    if (!response.ok) {
   
    const errorText = await response.text();
    throw new Error(errorText || "Error al crear el producto");
  }

    return response.json();
};
