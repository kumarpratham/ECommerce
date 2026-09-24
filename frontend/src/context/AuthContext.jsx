import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);

  // Get current user using JWT
  const fetchCurrentUser = async () => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      setUser(response.data);
      setToken(storedToken);

    } catch (error) {
      console.log("Session expired or invalid");

      localStorage.removeItem("token");
      setToken(null);
      setUser(null);

    } finally {
      setLoading(false);
    }
  };

  // Run when AuthProvider loads
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Register
  const register = async (name, email, password) => {
    const response = await api.post(
      "/api/auth/register",
      {
        name,
        email,
        password,
      }
    );

    return response.data;
  };

  // Login
  const login = async (email, password) => {
    const response = await api.post(
      "/api/auth/login",
      {
        email,
        password,
      }
    );

    const {
      access_token,
      user,
    } = response.data;

    localStorage.setItem(
      "token",
      access_token
    );

    setToken(access_token);
    setUser(user);

    return response.data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}