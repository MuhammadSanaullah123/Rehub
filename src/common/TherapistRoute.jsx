import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn, loggedInUser } from "../services/Auth";

function TherapistRoute(props) {
  if (!((isLoggedIn() && loggedInUser()?.user?.accountType) || loggedInUser()?.accountType === "Therapist")) {
    return <Redirect from={props.path} to="/login" />;
  }
  return <Route {...props} />;
}

export default TherapistRoute;
