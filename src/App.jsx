import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username.trim() === "" || password.trim() === "") {
            setError("Username and password cannot be empty!");
            return;
        }

        // Call backend login API
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // Include session cookies
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            onLogin(data.username); // Set user in app state
            navigate("/"); // Redirect to homepage
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Welcome Back! 🎁</h2>
                {error && <p className="error-msg">{error}</p>}
                <form onSubmit={handleSubmit}>
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
