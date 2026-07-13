import { VITA_API_BASE_URL } from "../../../common/api/api-config";

export const EnviarFacturacion = async(data)=>{

    const response=await fetch(`${VITA_API_BASE_URL}/emitir/comprobante`,{
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
    body: JSON.stringify(data), 
    });

    if (!response.ok) {
   
    const errorText = await response.text();
    throw new Error(errorText || "Error al enviar la facturacion");
  }

    return response.json();
};
