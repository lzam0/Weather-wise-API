import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  // State variables for email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
   const [success, setSuccess] = useState("");

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
      });

      // Parse JSON response from server
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      
      // If login successful, display success message
      setSuccess(data.message); // <-- Added to show 'Login successful'
      console.log("Login success:", data);

      // e.g., save token: localStorage.setItem("token", data.token)
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      
      {/* Display error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display success message */}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <p className="register-link">
        {"Don't have an account? "}
        <Link to="/register" className="register-text">
          Register with us
        </Link>
    </p>
    </div>
  );
}

export default Login;
