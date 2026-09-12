import { createContext, useContext, useState, useEffect } from "react"; 
import { getCurrentUser } from '../api/userApi';


const AuthContext = createContext();

export function AuthProvider ({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem("token")));

  useEffect(() => {
    if (!token) return;

    getCurrentUser()
    .then((data) => {
      setUser(data.user);
    })
    .catch((error) => {
      console.error(error);
      logout();
    })
    .finally(() => {
      setLoading(false);
    })
  }, [token]);

  function login(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setLoading(true);
  }

  function logout() {
    localStorage.removeItem("token");
    
    setToken(null);
    setUser(null);
    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{ token, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}