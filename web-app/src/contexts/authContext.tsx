"use client";
import React, { createContext, useState, useContext, useEffect,PropsWithChildren } from "react";
import axios from "axios";

/*
export type user = {
 // add your fields here eg
 id : string

}
*/
type AuthContextType = {
  isAuthenticated: boolean;
  user: any | null 
  // TODO : after you add user types change  user: user | null
  isLoading: boolean;
  login : (username: string, password: string) => void
  logout : () => void

};


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState(null);
  // TODO : after you add user Types set : 
  // const [user,setUser] = useState<user | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true);
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

export const useAuth = ():AuthContextType  =>{
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}
export default AuthContext;
