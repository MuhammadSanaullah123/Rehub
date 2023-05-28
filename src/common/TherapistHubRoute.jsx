import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn, loggedInUser } from "../services/Auth";

function TherapistHubRoute(props) {
  if (!((isLoggedIn() && loggedInUser()?.user.accountType) || loggedInUser()?.accountType === "TherapistHub")) {
    return <Redirect from={props.path} to="/login" />;
  }
  return <Route {...props} />;
}

export default TherapistHubRoute;
