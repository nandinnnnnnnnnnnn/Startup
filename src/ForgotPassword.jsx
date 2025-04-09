import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

function ForgotPassword() {
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const response = await fetch("/api/auth/reset-password", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, newPassword }),
            });
        
            if (response.ok) {
              setSuccess("Password reset successfully! You can now login.");
              setTimeout(() => navigate("/login"), 2000);
            } else {
              const result = await response.json();
              setError(`Error: ${result.msg}`);
            }
          } catch (err) {
            console.error("Password reset error:", err);
            setError("Error: Network issue");
          }
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
