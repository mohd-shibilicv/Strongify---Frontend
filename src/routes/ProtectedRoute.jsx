import React from "react";
import { useSelector } from "react-redux";
import NavigateComponent from "./NavigateComponent";

const ProtectedRoute = (props) => {
  const auth = useSelector((state) => state.auth);

  if (auth.account) {
    return props.children;
  } else {
    return <NavigateComponent />;
  }
};

export default ProtectedRoute;
