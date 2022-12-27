import React, { useState } from "react";
import { sendPasswordResetLink } from "./../../utils/authentication/authentication.utils";
import { toast } from "react-toastify";
export const ForgotPassowrd = () => {
  const [email, setEmail] = useState("");

  const handleSendPassWordReset = (e) => {
    sendPasswordResetLink(email)
      .then((res) => {
        toast.success(res.data.message);
        setEmail("");
      })
      .catch((err) => toast.error(err.response.data.message));
  };
  return (
    <div>
      <p>Please tell us your email</p>
      <input
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={(e) => handleSendPassWordReset(e)}>Submit</button>
    </div>
  );
};
