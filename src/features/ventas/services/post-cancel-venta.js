import { VITA_API_BASE_URL } from "../../../common/api/api-config";


export const CancelVentaById = async(id)=>{

   
    const response=await fetch(`${VITA_API_BASE_URL}/ventas/${id}/anular`,{
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
    });

    if (!response.ok) {
   
    const errorText = await response.text();
    throw new Error(errorText || "Error al anular la venta");
  }

    return response.json();
};
