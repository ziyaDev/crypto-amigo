"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromBackend() {
      try {
        const { data: user } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
          { withCredentials: true },
        );
        if (user) setUser(user);
      } catch (error) {
        console.error("Failed to load user:", error);
        // Handle error, e.g., redirect to login or show a message
      }
      setLoading(false);
    }

    loadUserFromBackend();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        { username, password },
        { withCredentials: true },
      );
      const { data: user } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
        { withCredentials: true },
      );
      if (user) {
        setUser(user);
        console.log("Got user", user);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true },
      );
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, isLoading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
