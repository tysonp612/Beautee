import React from "react";
import { useParams } from "react-router-dom";
//import from utils
import {
  activaeAccount,
  resendActivationToken,
} from "./../../utils/authentication/authentication.utils";
//import toast
import { toast } from "react-toastify";
export const ActivatePage = () => {
  //useParams to get the param of the url, split them to take the token and the email
  const params = useParams();
  const token = params.token.split("email=")[0];
  const email = params.token.split("email=")[1];
  const handleActivate = (e) => {
    e.preventDefault();
    return activaeAccount(token)
      .then((res) => {
        //toast success
        toast.success(res.data.message);
        //Navigate user back to homepage
      })
      .catch((err) => toast.error(err.response.data.message));
  };
  const handleResendToken = (e) => {
    e.preventDefault();
    console.log(email);
    return resendActivationToken(email)
      .then((res) => {
        toast.success(res.data.message);
        //toast success
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div>
      <button onClick={(e) => handleActivate(e)}>Activate</button>
      <button onClick={(e) => handleResendToken(e)}>Resend </button>
    </div>
  );
};
