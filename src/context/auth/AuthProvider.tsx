import { useState, useCallback, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { ProviderProps, AuthContextType } from "@/types";
import api from "@/services/api";
import { queryClient } from "@/config/queryClient";
import { useUIContext } from "@/hooks";
import { resetUI } from "@/actions";

export function AuthProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const { uiDispatch } = useUIContext();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsAuthLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsAuthLoading(true);
      try {
        queryClient.clear();
        uiDispatch(resetUI());
        const { data } = await api.post("/auth/login", { email, password });
        setUser(data.user);
        setIsAuthenticated(true);
      } finally {
        setIsAuthLoading(false);
      }
    },
    [uiDispatch],
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      setIsAuthLoading(true);
      try {
        queryClient.clear();
        uiDispatch(resetUI());
        const { data } = await api.post("/auth/register", { name, email, password });
        setUser(data.user);
        setIsAuthenticated(true);
      } finally {
        setIsAuthLoading(false);
      }
    },
    [uiDispatch],
  );

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      queryClient.clear();
      uiDispatch(resetUI());
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [uiDispatch]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isAuthLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
