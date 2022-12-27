import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updatePassword } from "./../../utils/authentication/authentication.utils";
export const ResetPassword = () => {
  const token = useParams().token;
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = credentials;
  const handleSubmit = (e) => {
    e.preventDefault();
    // check password and confirmPassword
    if (password === confirmPassword) {
      return updatePassword(token, password)
        .then((res) => {
          toast.success(res.data.message);
          setCredentials({ ...credentials, password: "", confirmPassword: "" });
          navigate("/");
        })
        .catch((err) => toast.error(err.response.data.message));
    }
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
    </div>
  );
};
