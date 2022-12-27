import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  updatePassword,
  sendPasswordResetLink,
} from "./../../utils/authentication/authentication.utils";
export const ResetPassword = () => {
  const params = useParams().token;
  const token = params.split("email=")[0];
  const email = params.split("email=")[1];
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = credentials;
  const handleSubmit = (e) => {
    e.preventDefault();
    // check password and confirmPassword
    if (password !== confirmPassword) {
      toast.error("Password and confirm password does not match");
    } else if (password.length < 6) {
      toast.error("Password must have minimum 6 characters length");
    } else {
      return updatePassword(token, password)
        .then((res) => {
          toast.success(res.data.message);
          setCredentials({ ...credentials, password: "", confirmPassword: "" });
          navigate("/");
        })
        .catch((err) => toast.error(err.response.data.message));
    }
  };
  const handleResendLink = (e) => {
    e.preventDefault();
    return sendPasswordResetLink(email)
      .then((res) => {
        toast.success("A reset link has been sent to you");
        setCredentials({ ...credentials, password: "", confirmPassword: "" });
      })
      .catch((err) => toast.error(err.response.data.message));
  };
  return (
    <div>
      <p>New password</p>
      <input
        type="password"
        value={password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <p>Confirm your password</p>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) =>
          setCredentials({ ...credentials, confirmPassword: e.target.value })
        }
      />
      <button onClick={(e) => handleSubmit(e)}>Submit</button>
      <button onClick={(e) => handleResendLink(e)}>Resend Link</button>
    </div>
  );
};
