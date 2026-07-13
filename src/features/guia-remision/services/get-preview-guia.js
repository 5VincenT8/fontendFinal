import { API_BASE_URL } from "../../../common/api/api-config";

export const getPreviewGuia = async(idVenta)=>{

   
    const response=await fetch(`${API_BASE_URL}/previsualizar/guia/${idVenta}`,{
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
    });

    if (!response.ok) {
   
    const errorText = await response.text();
    throw new Error(errorText || "Error al obtener la previsualizacion de la guia");
  }

    return response.json();
};
