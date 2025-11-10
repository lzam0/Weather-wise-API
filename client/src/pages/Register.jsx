import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { getText } from "../utils/contentLoader";

function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError(getText("registerPage", "passwordMismatch"));
      return;
    }

    try {
      //Backend endpoint placeholder (to be implemented later)
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name,surname, email, password }),
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
        <input
          type="text"
          placeholder={getText("registerPage", "firstName")}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder={getText("registerPage", "lastName")}
          required
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <input
          type="email"
          placeholder={getText("registerPage", "email")}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder={getText("registerPage", "password")}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder={getText("registerPage", "confirmPassword")}
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">{getText("registerPage", "registerBtn")}</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

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