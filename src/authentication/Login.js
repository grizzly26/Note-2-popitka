import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Login = ({ handleUserLogin, setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    if (!email || !password) {
      setErrors({ message: "Please enter both email and password." });
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/users");
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const users = await response.json();

      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem("isAuthenticated", "true");
        setLoggedIn(true); // Обновляем флаг loggedIn
        handleUserLogin(user); // Обновите метод входа пользователя, если необходимо
        navigate("/home");
      } else {
        setErrors({ message: "Invalid email or password." });
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setErrors({ message: "An error occurred during authentication." });
    }
  };

  return (
    <div className="container">
      <fieldset>
        <div>
          <h1>Login</h1>
          <hr />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            className="rect"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            className="rect"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>

          {errors.message && <p className="login-error">{errors.message}</p>}
        </div>
      </fieldset>
    </div>
  );
};

export default Login;
