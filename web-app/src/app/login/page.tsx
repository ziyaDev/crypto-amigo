"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/validate`,
          {
            withCredentials: true,
          },
        );

        Router.push("/dashboard/profile");
      } catch {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    const inputtedUsername = event.target.username.value;
    const inputtedPassword = event.target.password.value;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        {
          username: inputtedUsername,
          password: inputtedPassword,
        },
        {
          withCredentials: true,
        },
      );

      Router.push("/dashboard/profile");
    } catch (error: any) {
      console.error(
        "Error during login:",
        error.response?.data || error.message,
      );
      setError("Failed to login. Please try again.");
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="username"
        name="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginPage;
