"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  token?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loginUser: (userData: AuthUser) => void;
  logoutUser: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let stored;
    try {
      stored = localStorage.getItem("auth_user");
    } catch {}
    if (stored) {
      const parsed = JSON.parse(stored);
      queueMicrotask(() => {
        setUser(parsed);
      });
    }
  }, []);

  const loginUser = (userData: AuthUser) => {
    setUser(userData);
    try {
      localStorage.setItem("auth_user", JSON.stringify(userData));
    } catch {}
  };

  const logoutUser = () => {
    setUser(null);
    try {
      localStorage.removeItem("auth_user");
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
