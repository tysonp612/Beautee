import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./loading-to-redirect/loading-to-redirect";
export const UserRoute = ({ ...rest }) => {
  const user = useSelector((state) => state.user.currentUser);
  //In react-router v6, because Route is not allowed outside Routes, that's why we have to usr Outlet to render child component
  return user && user.token ? <Outlet {...rest} /> : <LoadingToRedirect />;
};
