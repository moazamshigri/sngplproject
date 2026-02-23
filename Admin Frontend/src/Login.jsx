import React, { useState } from "react";
import "./login.css";

const Login = ({ setIsAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.detail || "Login failed");
        return;
      }

      const data = await res.json();

      if (data.message === "Login successful") {
        localStorage.setItem("auth", "true"); // optional for persistence
        setIsAuth(true);
      } else {
        setError("Wrong username or password");
      }
    } catch (err) {
      setError("Server error, try again");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        className="login-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
};

export default Login;
