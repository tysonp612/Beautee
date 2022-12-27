import React, { useState } from "react";
//import dispatch from redux
import { useDispatch } from "react-redux";
//action type
import { UserActionTypes } from "./../../redux/reducers/user/user.types";
import "./login.page.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { logIn } from "./../../utils/authentication/authentication.utils";
export const LoginPage = () => {
  const dispatch = useDispatch();
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
    return logIn(credentials)
      .then((res) => {
        //toast success
        toast.success(res.data.message);
        // dispatch userdata
        dispatch({
          type: UserActionTypes.LOGGED_IN_USER,
          payload: res.data,
        });
        //change to booking page based on role
      })
      .catch((err) => toast.error(err.response.data.message));
  };
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-title">Welcome to Beautee</div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => handleLoginChange(e)}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={password}
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
