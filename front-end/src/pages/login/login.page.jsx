import React, { useState } from "react";
import "./login.page.css";
import { Link } from "react-router-dom";
export const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = credentials;
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    console.log("Submit");
  };
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-title">Welcome to Beautee</div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={(e) => handleLoginChange(e)}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            placeholder="Password"
            autoFocus
            onChange={(e) => handleLoginChange(e)}
          />
          <button type="submit" disabled={!email ? true : false}>
            Submit
          </button>
        </form>
        <p>
          Don't have an account? <Link to={"/register"}>Register</Link>
        </p>
        <Link to={"/forgot-password"} Forgot password>
          Forgot password?
        </Link>
      </div>
    </div>
  );
};
