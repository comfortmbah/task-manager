import { createContext, useContext, useState, useEffect } from "react"; 
import { getCurrentUser } from '../api/userApi';


const AuthContext = createContext();

export function AuthProvider ({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return;

    getCurrentUser()
    .then((data) => {
      setUser(data.user);
    })
    .catch((error) => {
      console.error(error);
      logout();
    });
  }, [token]);

  function login(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}