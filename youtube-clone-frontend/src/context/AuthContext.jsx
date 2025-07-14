// ✅ AuthContext.jsx: Provides global authentication and search state across your React app

import { createContext, useState, useEffect } from "react";

// Create a new context instance
export const AuthContext = createContext();

// Provider component to wrap your app and make auth state available
export function AuthProvider({ children }) {
  // Auth token state (stored in localStorage)
  const [token, setToken] = useState(null);

  // Video search title state (shared across components)
  const [searchTitle, setSearchTitle] = useState("");

  // Avatar image URL for the user (default fallback is a placeholder image)
  const [avatar, setAvatar] = useState("/avatar-placeholder.png");

  // Load token and avatar from localStorage when app loads (persist session)
  useEffect(() => {
    const t = localStorage.getItem("token");
    const a = localStorage.getItem("avatar");
    setToken(t);
    setAvatar(a || "/avatar-placeholder.png");
  }, []);

  // Login handler: stores token and avatar in localStorage and state
  const login = (t, a) => {
    localStorage.setItem("token", t);
    localStorage.setItem("avatar", a || "");
    setToken(t);
    setAvatar(a || "/avatar-placeholder.png");
  };

  // Logout handler: clears localStorage and resets state
  const logout = () => {
    localStorage.clear();
    setToken(null);
    setAvatar("/avatar-placeholder.png");
  };

  // Provide context values (token, avatar, login/logout, searchTitle state)
  return (
    <AuthContext.Provider value={{ token, avatar, login, logout, searchTitle, setSearchTitle }}>
      {children}
    </AuthContext.Provider>
  );
}
