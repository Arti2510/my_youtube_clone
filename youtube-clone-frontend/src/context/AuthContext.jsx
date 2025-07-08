
// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [avatar, setAvatar] = useState("/avatar-placeholder.png");

  useEffect(() => {
    const t = localStorage.getItem("token");
    const a = localStorage.getItem("avatar");
    setToken(t);
    setAvatar(a || "/avatar-placeholder.png");
  }, []);

  const login = (t, a) => {
    localStorage.setItem("token", t);
    localStorage.setItem("avatar", a || "");
    setToken(t);
    setAvatar(a || "/avatar-placeholder.png");
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setAvatar("/avatar-placeholder.png");
  };

  return (
    <AuthContext.Provider value={{ token, avatar, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
