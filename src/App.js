import React, { useEffect, useState } from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Login from "./physiotherapist/Login/Login";
import SignUp from "./physiotherapist/SignUp/SignUp";
import TermConditions from "./physiotherapist/TermConditions/TermConditions";
import Home from "./physiotherapist/Home/Home";
import Profile from "./physiotherapist/Profile/Profile";
import { getLoggedinUser, loggedInUser, updateAccountType } from "./services/Auth";
import { setAuthorizedUser } from "./features/userSlice";
import TherapistRoute from "./common/TherapistRoute";
import AboutUs from "./mainLayout/AboutUS/AboutUs";
import Privacy from "./physiotherapist/TermConditions/Privacy";
import { physiotherapyConfig, routeConfig } from "./router";
import ResetPassword from "./physiotherapist/ResetPassword/ResetPassword";
import VerifyEmail from "./physiotherapist/VerifyEmail/VerifyEmail";

function App() {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state?.user?.value?.user?.accountType);

  useEffect(() => {
    if (loggedInUser()) {
      getLoggedinUser().then((data) => {
        dispatch(setAuthorizedUser(data));
      });
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const receiptID = window.location.pathname.split("/")[2];
    if (window.location.pathname.split("/")[1] === "receipt") {
      // window.location.assign(`https://rehubcy.com/receipt/${receiptID}`)
    }
  }, []);

  return (
    <div className="app-page">
      <Router>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/about-us" component={AboutUs} />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/terms-of-service" component={TermConditions} />
          <Route path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/verify-email/:token" component={VerifyEmail} />
          <Route exact path="/reset-password/:token" component={ResetPassword} />
          <TherapistRoute exact path="/profile" component={Profile} />
          {physiotherapyConfig
            .filter((item) => item.access.includes(userType))
            .map((item) => (
              <Route key={item.route} exact path={`/${item.route}`} component={item.Component} />
            ))}
          {routeConfig
            .filter((item) => !item.access || item.access.includes(userType))
            .map((item) => (
              <Route key={item.route} exact path={`/${item.route}`} component={item.Component} />
            ))}
          <Redirect exact from="/*" to="/home" />
        </Switch>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
