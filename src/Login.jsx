import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Login success:", data);
            onLogin(data.username); // Update user in App.jsx
            navigate("/");
        } else {
            const body = await response.json();
            setError(`Error: ${body.msg}`);
        }
    } catch (err) {
        console.error("Login error:", err);
        setError("Error: Network error");
    }
};
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back! 🎁</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="custom-btn">Login</button>
        </form>
        <p className="signup-link">
          Forgot your password? <a href="/forgot-password">Reset it</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
