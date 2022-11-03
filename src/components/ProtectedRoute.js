import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

function ProtectedRoute(props) {
  let isLogin = useSelector((state) => state.user.login);

  console.log(isLogin);

  return <> {isLogin ? <Outlet /> : <Navigate to="/" />} </>;
}

export default ProtectedRoute;
