import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

function ForgotPassword() {
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = users.findIndex(user => user.username === username);

        if (userIndex === -1) {
            setError("User not found!");
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        users[userIndex].password = hashedPassword;

        localStorage.setItem("users", JSON.stringify(users));
        setSuccess("Password reset successfully! You can now login.");
        
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Reset Your Password 🔒</h2>
                {error && <p className="error-msg">{error}</p>}
                {success && <p className="success-msg">{success}</p>}
                <form onSubmit={handleReset}>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="login-input"
                    />
                    <button type="submit" className="custom-btn">Reset Password</button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
