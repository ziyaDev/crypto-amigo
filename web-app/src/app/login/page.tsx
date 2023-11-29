"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useAuth } from "@/contexts/authContext";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, user }: any = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/dashboard/profile"); // Redirect if already logged in
    }
  }, [user, router]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const inputtedUsername = event.target.username.value;
      const inputtedPassword = event.target.password.value;

      await login(inputtedUsername, inputtedPassword);

      router.push("/dashboard/profile");
    } catch (error: any) {
      console.error(
        "Error during login:",
        error.response?.data || error.message,
      );
      setError("Failed to login. Please try again.");
    }
  };

  if (!user) {
    return (
      <form onSubmit={handleSubmit}>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          id="password"
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
  }

  return null;
};

export default LoginPage;
