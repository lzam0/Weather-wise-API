import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { getText } from "../utils/contentLoader";

function Login() {
  // State variables for email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Send POST request to login endpoint
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Convert email and password to JSON string
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });

      // Parse JSON response from server
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <h1>{getText("loginPage", "title")}</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder={getText("loginPage", "emailPlaceholder")}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder={getText("loginPage", "passwordPlaceholder")}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{getText("loginPage", "loginButton")}</button>
      </form>
      
      {/* Display error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display success message */}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <p className="register-link">
        {getText("loginPage", "registerPrompt") + " "}
        <Link to="/register" className="register-text">
          {getText("loginPage", "registerLink")}
        </Link>
    </p>
    </div>
  );
}

export default Login;
