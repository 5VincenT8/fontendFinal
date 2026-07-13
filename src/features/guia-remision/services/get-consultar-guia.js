import { API_BASE_URL } from "../../../common/api/api-config";

export const getConsultarGuia = async(serie,numero)=>{

   
    const response=await fetch(`${API_BASE_URL}/consultar/guia/${serie}/${numero}`,{
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
    });

    if (!response.ok) {
   
    const errorText = await response.text();
    throw new Error(errorText || "Error al obtener la guia");
  }
  
    return response.json();
};
