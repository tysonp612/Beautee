import React, { useEffect, useState } from "react";
import { adminCheck } from "./../../utils/authentication/authentication.utils";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./loading-to-redirect/loading-to-redirect";

export const AdminRoute = ({ ...rest }) => {
  //setting state to ok
  const [ok, setOk] = useState(false);
  //get current user in redux state
  const user = useSelector((state) => state.user.currentUser);
  //Reload if user changes, when page is loaded, send to BE the token, get back the result, if ok, set ok and continue pages
  //if not ok, run loading to redirect component
  useEffect(() => {
    if (user) {
      adminCheck(user.token)
        .then((res) => {
          return setOk(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return setOk(false);
    }
  }, [user]);
  //In react-router v6, because Route is not allowed outside Routes, that's why we have to usr Outlet to render child component
  //Use Outlet to replace Route
  return ok ? <Outlet {...rest} /> : <LoadingToRedirect />;
};
