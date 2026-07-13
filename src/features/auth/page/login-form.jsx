import { useAuthStore } from '/src/features/auth/store/use-Auth-Store';
import { getLogin } from '/src/features/auth/services/get-login.js';
import { Form, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LoginCard } from '../../../common/components/item-card/login-card';

export function LoginForm() {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const login = useAuthStore((state) => state.login);
const navigate= useNavigate();

 const handleLogin = async (e) => {
    e.preventDefault(); 
    
    setError(""); 

    if (!username || !password) {
      setError("Complete todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const response = await getLogin(username,password);
      login(response.role)
      setTimeout(() => {
        navigate('/home', { replace: true });
      }, 300);
      
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert(error.message);
    }finally {
      setTimeout(() => setLoading(false), 300);
    }
  }; 

  return (
    <LoginCard 
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
      loading={loading} 
      error={error}
      />
  );
}