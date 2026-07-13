import {VITA_API_BASE_URL} from "../../../common/api/api-config";

export const getAllLotes = async()=>{

   
    const response=await fetch(`${VITA_API_BASE_URL}/inventario/lotes/all`,{
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
    });

    if (!response.ok) {
   
    const errorText = await response.text();
    throw new Error(errorText || "Error obtener todos los Lotes");
  }

    return response.json();
};
