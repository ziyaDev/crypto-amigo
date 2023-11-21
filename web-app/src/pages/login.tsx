import { useState } from "react";
import axios from "axios";
import Router from "next/router";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const inputtedUsername = event.target.username.value;
    const inputtedPassword = event.target.password.value;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`,
        {
          username: inputtedUsername,
          password: inputtedPassword,
        },
        {
          withCredentials: true,
        },
      );

      Router.push("/profile");
    } catch (error: any) {
      console.error(
        "Error during login:",
        error.response?.data || error.message,
      );
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
