import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthUser {
  email: string;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    if (email === 'internet@gmail.com' && password === 'internet2025@completo') {
      const userData = { email, isAuthenticated: true };
      localStorage.setItem('auth_user', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    setUser(null);
    navigate('/login');
  };

  const checkAuth = () => {
    const storedUser = localStorage.getItem('auth_user');
    if (!storedUser) {
      navigate('/login');
      return false;
    }
    return true;
  };

  return { user, login, logout, checkAuth };
};