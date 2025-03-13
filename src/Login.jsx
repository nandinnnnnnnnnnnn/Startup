import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs"; 

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.username === username);

        if (!user) {
            setError("User not found!");
            return;
        }

        //Compare password with the stored encrypted password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            setError("Incorrect password!");
            return;
        }

        onLogin(username);
        navigate("/");
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

