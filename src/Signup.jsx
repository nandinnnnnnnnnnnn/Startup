import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup({ onSignup }) {
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

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // to include cookies for session
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            onSignup(data.username); // app login
            navigate("/");
        } else {
            setError("Username already taken");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Create Your Account 🎁</h2>
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
                    <button type="submit" className="custom-btn">Sign Up</button>
                </form>
                <p className="signup-link">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
}

export default Signup;
