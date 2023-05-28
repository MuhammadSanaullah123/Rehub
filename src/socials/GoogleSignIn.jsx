import React, { useEffect } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { gapi } from "gapi-script";
import google from "../assets/google.png";

export default function GoogleSignIn({ onSuccess, onFailure }) {
  // const clientID =
  //   "677360402906-k4mm9bpq4tduegadicuefbirqpb2ebj8.apps.googleusercontent.com";
  const clientID = "883715914684-1nf8u78ntr61e1d6b6o75esg4h08cjbn.apps.googleusercontent.com";
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientID });
    });
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientID}>
      <GoogleLogin
        onError={onFailure}
        onSuccess={onSuccess}
        auto_select
        text=""
        type="icon"
        locale="en_US"
        shape="circle"
      >
        <img src={google} style={{ width: "inherit", height: "inherit" }} />
      </GoogleLogin>
    </GoogleOAuthProvider>
  );
}
