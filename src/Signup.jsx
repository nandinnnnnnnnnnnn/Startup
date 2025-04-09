import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup({ onSignup }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const handleSignup = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const response = await fetch("/api/auth/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", 
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Signup success:", data);
                onSignup(data.username); // Pass username to App.jsx
                navigate("/"); // Redirect to login page
            } else {
                const body = await response.json();
                setError(`Error: ${body.msg}`);
            }
        } catch (err) {
            console.error("Signup error:", err);
            setError("Error: Network error");
        }
    };


     /*   //Encrypt the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save new user
        const newUser = { username, password: hashedPassword };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        onSignup(username);
        navigate("/");
    };
    */
    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Create Your Account 🎁</h2>
                {error && <p className="error-msg">{error}</p>}
                <form onSubmit={handleSignup}>
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
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;

