import { VITA_API_BASE_URL } from "../../../common/api/api-config";

export const EnviarGuia= async(data)=>{

    const response=await fetch(`${VITA_API_BASE_URL}/emitir/guia`,{
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
    body: JSON.stringify(data), 
    });

    if (!response.ok) {
   
    const errorText = await response.text();
    throw new Error(errorText || "Error al enviar la Guia de Remision");
  }

    return response.json();
};