import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import { getText } from "../utils/contentLoader";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Password validation function
  // password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.
  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return regex.test(password);
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate password strength
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    } else {
      setPasswordError("");
    }

    // Confirm password match
    if (password !== confirmPassword) {
      setError(getText("registerPage", "passwordMismatch"));
      return;
    }

    try {
      // Backend API to call register user
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, // Pass firstName and lastName in the request body
        body: JSON.stringify({ firstName,lastName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || getText("registerPage", "registerFail"));
      }

      setSuccess(getText("registerPage", "registerSuccess"));
      console.log("Registration success:", data);
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="register">
      <h1>{getText("registerPage", "title")}</h1>
      <form className="register-form" onSubmit={handleRegister}>

        {/* First Name */}
        <input
          type="text"
          placeholder={getText("registerPage", "firstName")}
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        {/* Last Name */}
        <input
          type="text"
          placeholder="Last Name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder={getText("registerPage", "email")}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder={getText("registerPage", "password")}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Confirm password */}
        <input
          type="password"
          placeholder={getText("registerPage", "confirmPassword")}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">{getText("registerPage", "registerBtn")}</button>
      </form>
      
      {/* Success + error messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {password && passwordError && (
        <p style={{ color: "orange", fontSize: "0.9rem" }}>{passwordError}</p>
      )}

      <p className="login-link">
        {getText("registerPage", "loginPrompt")}{" "}
        <a href="/login" className="login-text">
          {getText("registerPage", "loginLink")}
        </a>
      </p>
    </div>
  );
}

export default Register;