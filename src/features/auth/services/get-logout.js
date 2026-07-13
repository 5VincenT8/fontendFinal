import { API_BASE_URL } from "../../../common/api/api-config";

export const getLogout = async()=>{

    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials:'include',
    });
     
  if (!response.ok) {
    throw new Error('Error al cerrar sesión en el servidor');
  }
  return true;
};