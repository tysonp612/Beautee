import React, { useState, useEffect } from "react";
//color wheel
import { HexColorPicker } from "react-colorful";
//toast
import { toast } from "react-toastify";
//css
import "./register.page.css";
//helper function
import { checkLength } from "./../../helper/check-length";
//axios
import { userRegister } from "./../../utils/authentication/authentication.utils";
export const RegisterPage = () => {
  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    color: "",
  });
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    confirmPassword,
    color,
  } = credentials;
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //check length of name, username,password
    console.log(credentials);
    if (
      !checkLength("name", first_name) ||
      !checkLength("name", last_name) ||
      !checkLength("name", username) ||
      !checkLength("password", password)
    ) {
      return;
    } else {
      //check passwordConfirm is equal password
      if (password !== confirmPassword) {
        toast.error("Password and password confirm is not the same");
      }
      //check if there is a color
      if (color.length === 0) {
        toast.error("Please pick a color");
      }
      //send to BE
      await userRegister(credentials)
        .then((res) => toast.success(res.data.message))
        .catch((err) => toast.error(err.response.data.message));
      // console.log(process.env);
      //send verify email in res
    }
  };

  return (
    <div>
      <div className="register-page-wrapper">
        <div className="register-page-container">
          <form onSubmit={handleSubmit} className="register-form-container">
            First name:
            <input
              type="text"
              required
              name="first_name"
              value={credentials.first_name}
              onChange={(e) => handleRegisterChange(e)}
              placeholder="First name"
            />
            Last name:
            <input
              required
              type="text"
              name="last_name"
              value={credentials.last_name}
              onChange={(e) => handleRegisterChange(e)}
              placeholder="Last name"
            />
            Username:
            <input
              required
              type="text"
              name="username"
              value={credentials.username}
              onChange={(e) => handleRegisterChange(e)}
              placeholder="Username"
            />
            Email:
            <input
              required
              type="email"
              name="email"
              value={credentials.email}
              onChange={(e) => handleRegisterChange(e)}
              placeholder="Email"
            />
            Password
            <input
              required
              type="password"
              name="password"
              value={credentials.password}
              placeholder="Password"
              autoFocus
              onChange={(e) => handleRegisterChange(e)}
            />
            Confirm Password
            <input
              required
              type="password"
              name="confirmPassword"
              value={credentials.confirmPassword}
              placeholder="Confirm password"
              autoFocus
              onChange={(e) => handleRegisterChange(e)}
            />
            <HexColorPicker
              color={color}
              onChange={(e) => setCredentials({ ...credentials, color: e })}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};
