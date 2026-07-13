import { API_BASE_URL } from "../../../common/api/api-config";

const endpoint='/login';
export const getLogin = async (username, password) => {

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  });
  

  if(!response.ok){
    throw new Error('Credenciales Incorrectas')
  }
  return response.json();
};