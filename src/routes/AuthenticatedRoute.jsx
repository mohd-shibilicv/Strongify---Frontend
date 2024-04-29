import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthenticatedRoute = (props) => {
  const auth = useSelector((state) => state.auth);

  if (!auth.account) {
    return props.children;
  } else {
    return <Navigate to='/' replace />;
  }
};

export default AuthenticatedRoute;
