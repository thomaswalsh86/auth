import React, { useState } from "react";

const Login = () => {
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            // Make request to the /login route to get Microsoft login URL
            const response = await fetch("http://localhost:3000/login");
            const data = await response.json();

            // Redirect the user to Microsoft's login page
            window.location.href = data.url;
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login with Microsoft</h2>
            <button onClick={handleLogin} disabled={loading}>
                {loading ? "Redirecting..." : "Sign in with Microsoft"}
            </button>
        </div>
    );
};

export default Login;